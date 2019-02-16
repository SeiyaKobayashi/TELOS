class LikesController < ApplicationController

  before_action :authenticate_user

  # Give like to the post
  def create
    @post = Post.find_by(id: params[:post_id])
    @posts = Post.all.order(updated_at: :desc)
    like = Like.new(user_id: @current_user.id, post_id: @post.id)
    like.save
    render json: like
    # if request.referer&.include?("/posts/index/#{@current_user.id}")
    #   render json: like
    # elsif request.referer&.include?("/posts/index")
    #   render json: like
    # elsif request.referer&.include?("/users/#{params[:user_id]}/mylist")
    #   render json: like
    # elsif request.referer&.include?("/users/#{params[:user_id]}")
    #   render json: like
    # elsif request.referer&.include?("/tags/#{params[:tag_id]}")
    #   render json: like
    # else
    #   render json: like
    # end
  end

  # Unlike the post
  def delete
    @posts = Post.all.order(updated_at: :desc)
    @post = Post.find_by(id: params[:post_id])
    like = Like.find_by(user_id: @current_user.id, post_id: params[:post_id])
    like.destroy
    render json: like
    # if request.referer&.include?("/posts/index/#{@current_user.id}")
    #   render json: like
    # elsif request.referer&.include?("/posts/index")
    #   render json: like
    # elsif request.referer&.include?("/users/#{params[:user_id]}/mylist")
    #   render json: like
    # elsif request.referer&.include?("/users/#{params[:user_id]}")
    #   render json: like
    # elsif request.referer&.include?("/tags/#{params[:tag_id]}")
    #   render json: like
    # else
    #   render json: like
    # end
  end

end
