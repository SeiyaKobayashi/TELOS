class UsersController < ApplicationController

  before_action :authenticate_user, {only:[:index, :show, :edit, :update]}
  before_action :forbid_login_user, {only: [:new, :create, :login_form, :login]}
  before_action :ensure_correct_user, {only: [:edit, :update]}

  # Prevent the user from being able to edit other users' profiles
  def ensure_correct_user
    if @current_user.id != params[:id].to_i
      flash[:notice] = "You don't have access to this page. Redirected to your personal page."
      redirect_to("/users/#{@current_user.id}")
    end
  end

  # Show all users in descending order (new -> old)
  def index
    @users = User.all.order(created_at: :desc)
    if params[:key] != ""
      @users = search(@users)
    end
  end

  # def index_following
  #   users = User.all.order(created_at: :desc)
  #   @users_following = users.following
  # end

  # Show all of your liked posts
  def index_mylist
    @user = User.find_by(id: params[:id])
    @posts_count = @user.posts.count
    @likes_count = @user.likes.count
    @user_following_count = @user.following.count
    @user_followed_count = @user.followed.count
    likes = @user.likes
    @user_likes = @user.likes.to_json
    @user_liked_posts = Array.new
    likes.each do |like|
      @user_liked_posts.push(Post.find_by(id: like.post_id))
    end
  end

  # Search users
  def search(users)
    keyword = params[:key]
    users = users.where('name like ?', "%#{keyword}%")
    if users.length == 0
      flash[:notice] = "No matches. Try again with other keywords."
      redirect_back(fallback_location: "/users/index")
    end

    return users
  end

  # Show user's details (profile image, email ...)
  def show
    @user = User.find_by(id: params[:id])
    @posts_count = @user.posts.count
    @likes_count = @user.likes.count
    @user_following_count = @user.following.count
    @user_followed_count = @user.followed.count
    @user_posts = @user.posts.to_json
  end

  # This is called from "show.html.erb"
  def relationships_following_private
    following_users = Relationship.where(follower_id: @current_user.id)
    @my_users = Array.new
    for user in following_users do
      @my_users.push(User.find_by(id: user.followed_id))
    end
  end

  # This is called from "show.html.erb"
  def relationships_following
    following_users = Relationship.where(follower_id: params[:id])
    @my_users = Array.new
    for user in following_users do
      @my_users.push(User.find_by(id: user.followed_id))
    end
  end

  # This is called from "show.html.erb"
  def relationships_follower_private
    followed_users = Relationship.where(followed_id: @current_user.id)
    @my_users = Array.new
    for user in followed_users do
      @my_users.push(User.find_by(id: user.follower_id))
    end
  end

  # This is called from "show.html.erb"
  def relationships_follower
    followed_users = Relationship.where(followed_id: params[:id])
    @my_users = Array.new
    for user in followed_users do
      @my_users.push(User.find_by(id: user.follower_id))
    end
  end

  ### Create a new user ###
  def new
    @user = User.new
  end

  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      image_name: "default_user.png"
    )
    if @user.save
      # Browser keeps track of session id
      session[:user_id] = @user.id
      flash[:notice] = "Signed up successfully."
      redirect_to("/users/#{@user.id}")
    else
      flash[:notice] = "Invalid fields. Please read signup instructions carefully and try again."
      @name = params[:name]
      @email = params[:email]
      redirect_to("/signup")
    end
  end

  ### Login ###
  def login_form
  end

  def login
    email = params[:email]
    password = params[:password]
    search_key = generate_hash(email, password)
    @user = User.find_by(search_key: search_key)
    if @user
      # Browser keeps track of session id
      session[:user_id] = @user.id
      flash[:notice] = "Logged in successfully."
      redirect_to("/posts/index")
    else
      @error_message = "Invalid email address or password."
      @email = params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end

  # Use this hash value for searching purpose (e.g. login)
  def generate_hash(*args)
    Digest::SHA3.hexdigest(args.join(''))
  end

  ### Logout ###
  def logout
    session[:user_id] = nil
    flash[:notice] = "Logged out."
    redirect_to("/login")
  end

  ### Update account information ###
  def edit
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.name = params[:name]
    @user.email = params[:email]
    @user.password = params[:password]
    @user.password_confirmation = params[:password_confirmation]
    @user.short_bio = params[:bio]

    if params[:image]
      @user.image_name = "#{@user.id}.jpg"
      image = params[:image]
      File.binwrite("public/user_images/#{@user.image_name}", image.read)
    end

    if @user.save
      flash[:notice] = "Your profile has been updated."
      redirect_to("/users/#{@user.id}")
    else
      render("users/edit")
    end
  end

  # This is called from "users/edit.html.erb"
  def delete
    user = User.find_by(id: params[:id])
    for post in user.posts do
      delete_post(post)
    end
    user.destroy
    flash[:notice] = "Your account has now been deleted. Thank you for using TELOS."
    redirect_to("/signup")
  end

  def delete_post(post)
    post_gid = GroupId.find_by(post_id: post.id)
    if post_gid == nil
      post.destroy
    else
      tags = Tag.where(post_id: post.id)
      if tags.length == 1
        delete_tag(tags[0], post)
      else
        tags.each do |tag|
          delete_tag(tag, post)
        end
      end
      # After unlinking tags from post, simply destroy the post
      post.destroy
    end
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
