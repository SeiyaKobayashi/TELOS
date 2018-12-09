class TagsController < ApplicationController

  before_action :authenticate_user

  # Show all tags in descending order (new -> old)
  def index
    tags = Tag.all.order(created_at: :asc)
    @tags_new = Array.new     # Array to store tags without duplicates

    if tags.empty?
      flash[:notice] = 'No tags available.'
    else
      if params[:key] != ""
        tags = search(tags)
      end

      tags.each do |tag|
        sb = 0     # Bit representing whether tag has the same label as other tags
        if @tags_new.length == 0
          @tags_new.push(tag)
        else
          @tags_new.each do |tag_new|
            # If the same group_id is found, set the bit and jump to next tag
            if tag.group_id == tag_new.group_id
              sb = 1
              break
            end
          end
          if sb == 1
            next
          else
            @tags_new.push(tag)
          end
        end
      end
    end
  end

  # Search tags
  def search(tags)
    keyword = params[:key]
    tags = tags.where('label like ?', "%#{keyword}%")

    if tags.length == 0
      flash[:notice] = "No matches. Try again with other keywords."
      redirect_back(fallback_location: "/tags/index")
    end

    return tags
  end

  # Show tag's details, including a list of posts to which the tag is attached.
  def show
    tags = Tag.where(group_id: params[:id])
    @tag = tags[0]
    posts_likes = Array.new
    @posts = Array.new

    tags.each do |tag|
      post = Post.find_by(id: tag.post_id)
      likes = Like.where(post_id: post.id).length
      posts_likes.push([post, likes])
    end

    posts_likes.sort!{|a,b| a[1] <=> b[1]}

    posts_likes.reverse.each do |post_like|
      @posts.push(post_like[0])
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

  # This is called from "tags/new.html.erb"
  def create
    @post = Post.find_by(id: params[:id])
    tag = Tag.new(label: params[:label], post_id: params[:id])
    tags = Tag.all.order(created_at: :desc)
    changed = 0     # Bit representing whether group_id has been changed

    # If it's the very first tag you create
    if tags.length == 0
      # If invalid (i.e. empty) entry
      if !tag.save
        flash[:notice] = "Please enter a valid tag label."
        redirect_to("/posts/#{@post.id}/tags")
        return
      else
        group_id = GroupId.new(post_id: @post.id, tag_id: tag.id)
        group_id.save
        tag.group_id = group_id.id
        tag.save
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
          group_id = GroupId.new(post_id: @post.id, tag_id: tag.id)
          group_id.save
          tag.group_id = group_id.id
        end
        tag.save
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

  # This is called from "tags/new.html.erb"
  def delete
    # Retrieve orginal tags attached to the post
    post = Post.find_by(id: params[:id])
    temp = Tag.where(post_id: post.id)
    tags_old = Array.new
    if temp.length == 0
      flash[:notice] = "Nothing can be deleted. Please attach tags before deleting."
      redirect_to("/posts/#{post.id}/tags")
      return
    else
      if temp.length == 1
        tags_old.push(Tag.find_by(id: temp[0].id))
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
