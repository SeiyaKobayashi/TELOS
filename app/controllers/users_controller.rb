class UsersController < ApplicationController

  before_action :authenticate_user, {only:[:index, :show, :edit, :update]}
  before_action :forbid_login_user, {only: [:new, :create, :login_form, :login]}
  before_action :ensure_correct_user, {only: [:edit, :update]}

  # List all users in descending order (new -> old)
  def index
    @users = User.all.order(created_at: :desc)
  end

  # Create a new user
  def new
    @user = User.new
  end

  # create is called from "new.html.erb"
  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      image_name: "default_user.png"
    )
    if @user.save
      # Browser keeps track of session id
      session[:user_id] = @user.id
      flash[:notice] = "Signed up successfully."
      redirect_to("/users/#{@user.id}")
    else
      render("users/new")
    end
  end

  # Show user details (profile photo, email etc.)
  def show
    @user = User.find_by(id: params[:id])
  end

  # edit is called from "show.html.erb"
  def edit
    @user = User.find_by(id: params[:id])
  end

  # update is called from "edit.html.erb"
  def update
    @user = User.find_by(id: params[:id])
    @user.name = params[:name]
    @user.email = params[:email]
    @user.password = params[:password]

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

  # Show login_form
  def login_form
  end

  # login is calld from "login_form.html.erb"
  def login
    @user = User.find_by(email: params[:email], password: params[:password])
    if @user
      # Browser keeps track of session id
      session[:user_id] = @user.id
      flash[:notice] = "Logged in successfully."
      redirect_to("/posts/index")
    else
      @error_message = "Invalid email address / password."
      @email = params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end

  # logout is called from "application.html.erb"
  def logout
    session[:user_id] = nil
    flash[:notice] = "Logged out."
    redirect_to("/login")
  end

  # Check if it's his/her own user page and prevent from being able to edit profile
  def ensure_correct_user
    if @current_user.id != params[:id].to_i
      flash[:notice] = "You do not have authorization. Redirected to your personal page."
      redirect_to("/users/#{@current_user.id}")
    end
  end

end
