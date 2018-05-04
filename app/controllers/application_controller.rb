class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_current_user

  # Set current user
  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  # Check if a valid user and prevent from viewing certain pages
  def authenticate_user
    if @current_user == nil
      flash[:notice] = "Login to continue."
      redirect_to("/login")
    end
  end

  # Check if a valid user and prevent from logging in twice
  def forbid_login_user
    if @current_user
      flash[:notice] = "You're already logged in."
      redirect_to("/posts/index")
    end
  end

end
