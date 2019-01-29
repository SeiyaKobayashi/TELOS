class TagsController < ApplicationController

  before_action :authenticate_user

  # Show all tags in descending order (new -> old)
  def index
    tags = Tag.all.order(created_at: :asc)
    @tags_distinct = Array.new     # Array to store tags without duplicates

    if tags.empty?
      flash[:notice] = 'No tags available.'
    else
      if params[:key] != ""
        tags = search(tags)
      end
      tags.each do |tag|
        sb = 0     # Bit representing whether tag has the same label as other tags
        if @tags_distinct.length == 0
          @tags_distinct.push(tag)
        else
          @tags_distinct.each do |tag_distinct|
            # If the same group_id is found, set the bit and jump to next tag
            if tag.group_id == tag_distinct.group_id
              sb = 1
              break
            end
          end
          if sb == 1
            next
          else
            @tags_distinct.push(tag)
          end
        end
      end
    end
  end

  # def following_index
  #
  # end

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
    # @tag = Tag.new(label: params[:label])
    temp = Tag.where(post_id: @post.id)
    @tags = ""
    if temp != nil
      temp.each do |tag|
        @tags = @tags + tag.label + ", "
      end
    end
  end

  # This is called from "tags/new.html.erb"
  def edit
    post = Post.find_by(id: params[:id])
    tags_all = Tag.all.order(created_at: :desc)
    changed = 0     # Bit representing whether group_id has been changed

    # Retrieve orginal tags attached to the post
    temp_before = Tag.where(post_id: post.id)
    tags_before = Array.new
    if temp_before != nil
      temp_before.each do |temp|
        tags_before.push(temp.label)
      end
    end

    # Get a list of new tags from textarea
    temp_after = params[:tags]
    tags_after = Array.new
    if temp_after != nil
      temp_after = temp_after.delete(" ")
      temp_after = temp_after.split(",")
      temp_after.each do |temp|
        tags_after.push(temp)
      end
    end

    # Compare those two arrays
    diff = tags_after - tags_before | tags_before - tags_after
    diff = diff.uniq
    if diff.length != 0
      diff.each do |d|
        # Note: 'find_by' method is case INSENSITIVE!! (might cause bugs in some cases)
        if tags_before.include?(d) == true
          temp_before.each do |tag_b|
            if d == tag_b.label
              tag_b.destroy
              break
            end
          end
        else
          tag_new = Tag.new(label: d, post_id: post.id)
          tags_all.each do |tag_n|
            if tag_new.label == tag_n.label
              tag_new.group_id = tag_n.group_id
              changed = 1
              break
            end
          end
          if changed == 0
            group_id = GroupId.new(post_id: post.id, tag_id: tag_new.id)
            group_id.save
            tag_new.group_id = group_id.id
          end
          tag_new.save
          changed = 0
        end
      end
      flash[:notice] = "Update has been saved."
      redirect_to("/posts/#{post.id}")
      return
    else
      flash[:notice] = "Nothing has been changed."
      redirect_to("/posts/#{post.id}/tags")
      return
    end
  end

end
