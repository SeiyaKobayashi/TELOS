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
    @post.destroy
    flash[:notice] = "Your post has been deleted."
    redirect_to("/posts/index")
  end

end
