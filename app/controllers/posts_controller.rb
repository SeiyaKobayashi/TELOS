class PostsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_correct_user, {only:[:edit, :update, :destroy]}

  def index
    # varはaction内で作成(@をつけることでviewでも使える)
    @posts = Post.all.order(created_at: :desc)
  end
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
  end
  def new
    @post = Post.new(content: params[:content])
  end
  def create
    @post = Post.new(content: params[:content], user_id: @current_user.id)
    if @post.save
      flash[:notice] = "Your comment has been posted."
      redirect_to("/posts/index")
    else
      render("posts/new")
    end
  end
  def edit
    @post = Post.find_by(id: params[:id])
  end
  def update
    @post = Post.find_by(id: params[:id])
    @post.content = params[:content]
    if @post.save
      flash[:notice] = "Post has been updated."
      redirect_to("/posts/index")
    else
      render("posts/edit")
    end
  end
  def delete
    @post = Post.find_by(id: params[:id])
    @post.destroy
    flash[:notice] = "Your comment has been deleted."
    redirect_to("/posts/index")
  end

  def ensure_correct_user
    @post = Post.find_by(id: params[:id])
    if @post.user_id != @current_user.id
      flash[:notice] = "You do not have authorization. Redirected to your personal page."
      redirect_to("/users/#{@current_user.id}")
    end
  end

end
