class PostsController < ApplicationController

  before_action :authenticate_user
  before_action :ensure_correct_user, {only:[:edit, :update, :delete]}

  # Show all posts in descending order (new -> old)
  def index
    @posts = Post.all.order(updated_at: :desc)
  end

  # Show post details (user, date, tags etc.)
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
    # Search GroupId model, given @post.id
    @tags = GroupId.where(post_id: @post.id)
    # Array to store tags
    @arr = Array.new
    @tags.each do |tag|
      @arr.push(Tag.find_by(id: tag.tag_id))
    end
  end

  # Create a new post
  def new
    @post = Post.new(content: params[:content])
  end

  # create is called from "new.html.erb"
  def create
    @post = Post.new(content: params[:content], user_id: @current_user.id)
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

  # update is called from "edit.html.erb"
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

  # delete is called from "show.html.erb"
  def delete
    @post = Post.find_by(id: params[:id])
    @post.destroy
    flash[:notice] = "Your post has been deleted."
    redirect_to("/posts/index")
  end

  # Check if the post that current_user is about to edit/delete is his/her own
  def ensure_correct_user
    @post = Post.find_by(id: params[:id])
    if @post.user_id != @current_user.id
      flash[:notice] = "You do not have authorization. Redirected to your personal page."
      redirect_to("/users/#{@current_user.id}")
    end
  end

end
