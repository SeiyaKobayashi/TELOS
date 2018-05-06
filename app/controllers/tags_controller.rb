class TagsController < ApplicationController

  # List all tags in descending order
  def index
    @tags = Tag.all.order(created_at: :asc)
    # Array to store group_ids
    @arr = Array.new
    # Array to store tags (no same labels)
    @tags_new = Array.new

    @tags.each do |tag|
      # Valid bit to detemine if it has the same label as other tags
      @valid = 1
      # If it's the very first tag
      if @arr.length == 0
        @tags_new.push(tag)
        @arr.push(tag.group_id)
      # Otherwise
      else
        @arr.each do |id|
          # If the same group_id is found, set valid bit to 0 and jump to next tag
          if tag.group_id == id
            @valid = 0
            break
          end
        end
        if @valid == 0
          next
        else
          @tags_new.push(tag)
          @arr.push(tag.group_id)
        end
      end
    end
  end

  # Show tag details
  def show
    @tag = Tag.find_by(id: params[:id])
    # Search GroupId model, given @tag.group_id
    @post_new = GroupId.where(tag_group_id: @tag.group_id)
    # Array to store posts
    @arr = Array.new
    @post_new.each do |post|
      @arr.push(Post.find_by(id: post.post_id))
    end
  end

  # Create a new tag
  def new
    @post = Post.find_by(id: params[:id])
    @tag = Tag.new(label: params[:label])
  end

  def create
    @post = Post.find_by(id: params[:id])
    @tag = Tag.new(label: params[:label], post_id: params[:id])
    @tags = Tag.all.order(created_at: :desc)
    # If it's the very first tag you created
    if @tags.length == 0
      # If invalid entry
      if !@tag.save
        flash[:notice] = "Please enter a valid tag name."
        redirect_to("/posts/#{@post.id}/tags")
        return
      # If valid entry
      else
        @tag.group_id = @tag.id
        @tag.save
        # Function as an array to store multiple group_ids / tag_ids / post_ids for one post
        @group_id = GroupId.new(tag_group_id: @tag.group_id, post_id: @post.id, tag_id: @tag.id)
        @group_id.save
        flash[:notice] = "A new tag has been added."
        redirect_to("/tags/index")
        return
      end
    # If invalid entry
    elsif !@tag.save
      flash[:notice] = "Please enter a valid tag name."
      redirect_to("/posts/#{@post.id}/tags")
      return
    # If valid entry
    else
      @tags.each do |tag|
        # If same label already exists, add post to that tag
        if @tag.label == tag.label
          # Avoid attaching same tag to the same post
          if @tag.post_id == tag.post_id
            flash[:notice] = "Same tag cannot be attached."
            redirect_to("/posts/#{@post.id}/tags")
            return
          else
            @tag.group_id = tag.group_id
            @tag.save
          end
          @group_id = GroupId.new(tag_group_id: @tag.group_id, post_id: @post.id, tag_id: @tag.id)
          @group_id.save
          flash[:notice] = "This post has been added to existing label: '#{@tag.label}'."
          redirect_to("/tags/index")
          return
        end
      end
      @tag.group_id = @tag.id
      @tag.save
      @group_id = GroupId.new(tag_group_id: @tag.group_id, post_id: @post.id, tag_id: @tag.id)
      @group_id.save
      flash[:notice] = "A new tag has been added."
      redirect_to("/tags/index")
      return
    end
  end
end
