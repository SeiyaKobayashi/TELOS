class RelationshipsController < ApplicationController
  before_action :authenticate_user

  # Follow the user
  def create
    # @user = User.find_by(id: params[:id])
    following = Relationship.new(follower_id: @current_user.id, followed_id: params[:id])
    following.save
    redirect_to("/users/#{params[:id]}")
  end

  # Unfollow the user
  def delete
    Relationship.find_by(follower_id: @current_user.id, followed_id: params[:id]).destroy
    redirect_to("/users/#{params[:id]}")
  end
end
