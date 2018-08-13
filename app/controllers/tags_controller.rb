class TagsController < ApplicationController

    before_action :authenticate_user

  # List all tags in descending order
  def index
    tags = Tag.all.order(created_at: :asc)
    if params[:key] != ""
        tags = search(tags)
    end
    @tags_new = Array.new     # Array to store tags w/o same labels

    tags.each do |tag|
      same = 0     # Bit that represents whether tag has the same label as other tags
      if @tags_new.length == 0
        @tags_new.push(tag)
      else
        @tags_new.each do |tag_new|
          # If the same group_id is found, set the bit and jump to next tag
          if tag.group_id == tag_new.group_id
            same = 1
            break
          end
        end
        if same == 1
          next
        else
          @tags_new.push(tag)
        end
      end
    end
  end

  # Search tags
  def search(tags)
      keyword = params[:key]
      tags = tags.where('label like ?', "%#{keyword}%")
      if tags.length == 0
          flash[:notice] = "No matches. Please try other keywords."
          redirect_back(fallback_location: "/tags/index")
      end
      return tags
  end

  # Show tag details (list of posts to which the tag is attached)
  def show
    @tag = Tag.find_by(id: params[:id])
    posts = GroupId.where(tag_group_id: @tag.group_id)     # Search GroupId model, given @tag.group_id
    @posts_new = Array.new     # Array to store posts

    posts.each do |post|
      @posts_new.push(Post.find_by(id: post.post_id))
    end
  end

  # Create a new tag
  def new
    @post = Post.find_by(id: params[:id])
    @tag = Tag.new(label: params[:label])
    tags = Tag.where(post_id: @post.id)
    @tags_list = ""
    if tags != nil
        tags.each do |tag|
            @tags_list = @tags_list + "#" + tag.label + "\r\n"
        end
    end
  end

  # create is called from "tags/new.html.erb"
  def create
    @post = Post.find_by(id: params[:id])
    tag = Tag.new(label: params[:label], post_id: params[:id])
    tags = Tag.all.order(created_at: :desc)
    changed = 0     # Bit that represents whether group_id has been changed

    # If it's the very first tag you create
    if tags.length == 0
      # If invalid (i.e. empty) entry
      if !tag.save
        flash[:notice] = "Please enter a valid tag label."
        redirect_to("/posts/#{@post.id}/tags")
        return
      else
        tag.group_id = tag.id
        tag.save
        # GroupId is a model that stores tag_group_ids, post_ids, and tag_ids
        group_id = GroupId.new(tag_group_id: tag.group_id, post_id: @post.id, tag_id: tag.id)
        group_id.save
        flash[:notice] = "A new tag has been added."
        redirect_to("/tags/#{tag.group_id}")
        return
      end
    else
      # If invalid (i.e. empty) entry
      if !tag.save
        flash[:notice] = "Please enter a valid tag label."
        redirect_to("/posts/#{@post.id}/tags")
        return
      else
        tags.each do |tag_n|
          # Avoid attaching same tag to the same post
          if tag.label.downcase == tag_n.label.downcase && tag.post_id == tag_n.post_id
              tag.destroy
              flash[:notice] = "Same tag cannot be attached."
              redirect_to("/posts/#{@post.id}/tags")
              return
          elsif tag.label.downcase == tag_n.label.downcase && tag.post_id != tag_n.post_id
              tag.group_id = tag_n.group_id
              changed = 1
              break
          end
        end
        if changed == 0
            tag.group_id = tag.id
        end
        tag.save
        group_id = GroupId.new(tag_group_id: tag.group_id, post_id: @post.id, tag_id: tag.id)
        group_id.save
        if changed == 1
          flash[:notice] = "This post has been added to the existing label: '#{tag.label}'."
        else
          flash[:notice] = "A new tag has been added."
        end
        redirect_to("/tags/#{tag.group_id}")
        return
      end
    end
  end

  # delete is called from "tags/new.html.erb"
  def delete
      # Retrieve orginal tags attached to the post
      post = Post.find_by(id: params[:id])
      temp = GroupId.where(post_id: post.id)
      tags_old = Array.new
      if temp.length == 0
          flash[:notice] = "Nothing can be deleted. Please attach tags before deleting."
          redirect_to("/posts/#{post.id}/tags")
          return
      else
          if temp.length == 1
              tags_old.push(Tag.find_by(id: temp[0].tag_id))
          else
              temp.each do |tag_old|
                  tags_old.push(Tag.find_by(id: tag_old.tag_id))
              end
          end
      end

      # Get new tags from textarea, removing "#" and "\r\n"
      temp_new = params[:tags]
      tags_new = Array.new
      if temp_new != nil
          temp_new = temp_new.split("\r\n")
          if temp_new.length == 1
              temp_new = temp_new[0]
              temp_new = temp_new[1, temp_new.length-1]
              tags_new.push(Tag.find_by(label: temp_new))
          else
              temp_new.each do |tag_new|
                  tag_new = tag_new[1, tag_new.length-1]
                  tags_new.push(Tag.find_by(label: tag_new))
              end
          end
      end

      # Compare these two arrays of tags
      diff = tags_old - tags_new
      if diff.length != 0
          diff.each do |tag_to_be_removed|
              tag_gid = GroupId.find_by(tag_id: tag_to_be_removed.id)
              tag_gid.destroy
              tag_to_be_removed.destroy
          end
          flash[:notice] = "Tags have been deleted."
          redirect_to("/posts/#{post.id}")
          return
      else
          flash[:notice] = "Nothing has been changed. Please delete tags you want to be removed."
          redirect_to("/posts/#{post.id}/tags")
          return
      end
  end

end
