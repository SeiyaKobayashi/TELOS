class PostsController < ApplicationController

  before_action :authenticate_user
  before_action :ensure_correct_user, {only:[:edit, :update, :delete]}

  # Check if the post that current_user is about to edit/delete is his/her own
  def ensure_correct_user
    @post = Post.find_by(id: params[:id])
    if @post.user_id != @current_user.id
      flash[:notice] = "You cannot edit this post. Redirected to your personal page."
      redirect_to("/users/#{@current_user.id}")
    end
  end

  # Show all posts in descending order (new -> old)
  def index
    @posts = Post.all.order(updated_at: :desc)
    if @posts.empty?
      flash[:notice] = 'No posts available.'
    else
      if params[:key] != ""
        @posts = search(@posts)
      end
    end
  end

  # Show all posts (and posts they've liked) of your following users
  def timeline
    # Get users you are following
    _users_following = @current_user.following
    users_following = Array.new
    _users_following.each do |r|
      users_following.push(User.find_by(id: r.followed_id))
    end

    # Get posts of the users you are following
    posts_following = Array.new
    users_following.each do |user|
      posts_following.push(Post.where(user_id: user.id))
    end

    # Single loop gives an error (don't know why)
    @posts_timeline = Array.new
    posts_following.each do |post|
      post.each do |p|
        @posts_timeline.push(p)
      end
    end

    @posts_timeline = @posts_timeline.sort_by{|p| p.updated_at}
    @posts_timeline = @posts_timeline.reverse
  end

  # Search posts
  def search(posts)
    keyword = params[:key]
    posts = posts.where('content like ?', "%#{keyword}%")
    if posts.length == 0
      flash[:notice] = "No matches. Try again with other keywords."
      redirect_back(fallback_location: "/posts/index")
    end

    return posts
  end

  # Show post's details (user, date, tags ...)
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
    @tags = Tag.where(post_id: @post.id)
  end

  # Create a new post
  def new
    @post = Post.new(content: params[:content])
  end

  # This is called from "posts/new.html.erb"
  def create
    @post = Post.new(content: "#{params[:word]} (#{params[:pos]}): #{params[:definition]}\r\n#{params[:sentence]}",
                     user_id: @current_user.id)

    if @post.save
      flash[:notice] = "Your post has been added."
      redirect_to("/posts/index")
    else
      render("posts/new")
    end
  end

  # Edit your past post
  def edit
    @post = Post.find_by(id: params[:id])
  end

  # This is called from "posts/edit.html.erb"
  def update
    @post = Post.find_by(id: params[:id])
    @post.content = params[:content]

    if @post.save
      flash[:notice] = "Your post has been updated."
      redirect_to("/posts/index")
    else
      render("posts/edit")
    end
  end

  # This is called from "posts/show.html.erb"
  def delete
    @post = Post.find_by(id: params[:id])
    post_gid = GroupId.find_by(post_id: @post.id)
    if post_gid == nil
      @post.destroy
    else
      tags = Tag.where(post_id: @post.id)
      if tags.length == 1
        delete_tag(tags[0], @post)
      else
        tags.each do |tag|
          delete_tag(tag, @post)
        end
      end
      # After unlinking tags from post, simply destroy the post
      @post.destroy
    end
    flash[:notice] = "Your post has been deleted."
    redirect_to("/posts/index")
  end

  def delete_tag(tag, post)
    tag_gid = tag.group_id
    tags_with_that_gid = Tag.where(group_id: tag_gid)
    # If that tag is attached only to that post
    if tags_with_that_gid.length == 1
      gid = GroupId.find_by(tag_id: tag.id)
      gid.destroy
      tag.destroy
    # Otherwise, loop through tags with that group id
    else
      tags_with_that_gid.each do |tag_n|
        if tag_n.post_id == post.id
          gid = GroupId.find_by(tag_id: tag_n.id)
          gid.destroy
          tag_n.destroy
        else
          next
        end
      end
    end
  end

end
