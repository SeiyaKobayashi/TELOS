class TagsController < ApplicationController

  # List all tags in descending order
  def index
    @tags = Tag.all.order(created_at: :asc)
    @tags_new = Array.new     # Array to store tags (no same labels)

    @tags.each do |tag|
      @same = 0     # Bit that represents whether tag has the same label as other tags
      if @tags_new.length == 0
        @tags_new.push(tag)
      else
        @tags_new.each do |tag_new|
          # If the same group_id is found, set the bit and jump to next tag
          if tag.group_id == tag_new.group_id
            @same = 1
            break
          end
        end
        if @same == 1
          next
        else
          @tags_new.push(tag)
        end
      end
    end
  end

  # Show tag details (list of posts to which the tag is attached)
  def show
    @tag = Tag.find_by(id: params[:id])
    @posts = GroupId.where(tag_group_id: @tag.group_id)     # Search GroupId model, given @tag.group_id
    @posts_new = Array.new     # Array to store posts

    @posts.each do |post|
      @posts_new.push(Post.find_by(id: post.post_id))
    end
  end

  # Create a new tag
  def new
    @post = Post.find_by(id: params[:id])
    @tag = Tag.new(label: params[:label])
    @tags = Tag.where(post_id: @post.id)
    @tags_list = ""
    @tags.each do |tag|
        @tags_list = @tags_list + "#" + tag.label + "\r\n"
    end
  end

  # create is called from "tags/new.html.erb"
  def create
    @post = Post.find_by(id: params[:id])
    @tag = Tag.new(label: params[:label], post_id: params[:id])
    @tags = Tag.all.order(created_at: :desc)
    @changed = 0     # Bit that represents whether group_id has been changed

    # If it's the very first tag you create
    if @tags.length == 0
      # If invalid (empty) entry
      if !@tag.save
        flash[:notice] = "Please enter a valid tag name."
        redirect_to("/posts/#{@post.id}/tags")
        return
      else
        @tag.group_id = @tag.id
        @tag.save
        # GroupId is a model that stores tag_group_ids, post_ids, and tag_ids
        @group_id = GroupId.new(tag_group_id: @tag.group_id, post_id: @post.id, tag_id: @tag.id)
        @group_id.save
        flash[:notice] = "A new tag has been added."
        redirect_to("/tags/#{@tag.group_id}")
        return
      end
    # After creating the first tag
    else
      # If invalid (empty) entry
      if !@tag.save
        flash[:notice] = "Please enter a valid tag name."
        redirect_to("/posts/#{@post.id}/tags")
        return
      else
        @tags.each do |tag|
          # If same label already exists, add post to that tag (Avoid attaching same tag to the same post)
          if @tag.label.downcase == tag.label.downcase && @tag.post_id == tag.post_id
            @tag.destroy
            flash[:notice] = "Same tag cannot be attached."
            redirect_to("/posts/#{@post.id}/tags")
            return
          elsif @tag.label.downcase == tag.label.downcase && @tag.post_id != tag.post_id
            @tag.group_id = tag.group_id
            @changed = 1
            next
          end
        end
        if @changed == 0
          @tag.group_id = @tag.id
        end
        @tag.save
        @group_id = GroupId.new(tag_group_id: @tag.group_id, post_id: @post.id, tag_id: @tag.id)
        @group_id.save
        if @changed == 1
          flash[:notice] = "This post has been added to the existing label: '#{@tag.label}'."
        else
          flash[:notice] = "A new tag has been added."
        end
        redirect_to("/tags/#{@tag.group_id}")
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
      if temp.length == 1
          tags_old.push(Tag.find_by(id: temp[0].tag_id))
      else
          temp.each do |tag_old|
              tags_old.push(Tag.find_by(id: tag_old.tag_id))
          end
      end

      # Get new tags from textarea, removing "#" and "\r\n"
      temp_new = params[:tags]
      if temp_new == nil
          temp_new = Array.new
      else
          temp_new = temp_new.split("\r\n")
          tags_new = Array.new
          if temp_new.length == 1
              temp_new = temp_new[0]
              temp_new = temp_new[1, temp_new.length-1]
          else
              temp_new.each do |tag_new|
                  tag_new = tag_new[1, tag_new.length-1]
                  tags_new.push(tag_new)
              end
          end
      end

      # Compare these two arrays of tags
      diff = tags_old - tags_new
      if diff != nil
          diff.each do |tag_to_be_removed|
              tags_with_same_gid = GroupId.where(tag_group_id: tag_to_be_removed.group_id)
              if tags_with_same_gid.length == 1
                  tags_with_same_gid[0].destroy
                  tag_to_be_removed.destroy
              else
                  tag_to_be_removed.destroy
              end
          end
      else
          flash[:notice] = "Nothing has been changed. Please delete tags you want to be removed."
      end
      flash[:notice] = "Tags deleted."
      redirect_to("/posts/#{post.id}")
  end

end
