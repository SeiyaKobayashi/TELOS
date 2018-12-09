class LikesController < ApplicationController

  before_action :authenticate_user

  # Give like to post
  def create
    @post = Post.find_by(id: params[:id])
    like = Like.new(user_id: @current_user.id, post_id: @post.id)
    like.save
    redirect_to("/posts/#{params[:id]}")
  end

  # Unlike the post
  def delete
    Like.find_by(user_id: @current_user.id, post_id: params[:id]).destroy
    redirect_to("/posts/#{params[:id]}")
  end

end
