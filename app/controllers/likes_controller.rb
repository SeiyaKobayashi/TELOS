class LikesController < ApplicationController

  before_action :authenticate_user

  # Give like to the post
  def create
    @post = Post.find_by(id: params[:post_id])
    @posts = Post.all.order(updated_at: :desc)
    like = Like.new(user_id: @current_user.id, post_id: @post.id)
    like.save
    if request.referer&.include?("/posts/index/#{@current_user.id}")
      redirect_to("/posts/index/#{@current_user.id}")
    elsif request.referer&.include?("/posts/index")
      # render partial: 'posts/likes', locals: {post: @post}
      redirect_to("/posts/index")
    elsif request.referer&.include?("/users/#{params[:user_id]}/mylist")
      redirect_to("/users/#{params[:user_id]}/mylist")
    elsif request.referer&.include?("/users/#{params[:user_id]}")
      redirect_to("/users/#{params[:user_id]}")
    elsif request.referer&.include?("/tags/#{params[:tag_id]}")
      redirect_to("/tags/#{params[:tag_id]}")
    else
      redirect_to("/posts/#{params[:post_id]}")
    end
  end

  # Unlike the post
  def delete
    @posts = Post.all.order(updated_at: :desc)
    @post = Post.find_by(id: params[:post_id])
    Like.find_by(user_id: @current_user.id, post_id: params[:post_id]).destroy
    if request.referer&.include?("/posts/index/#{@current_user.id}")
      redirect_to("/posts/index/#{@current_user.id}")
    elsif request.referer&.include?("/posts/index")
      # render partial: 'posts/likes', locals: {post: @post}
      redirect_to("/posts/index")
    elsif request.referer&.include?("/users/#{params[:user_id]}/mylist")
      redirect_to("/users/#{params[:user_id]}/mylist")
    elsif request.referer&.include?("/users/#{params[:user_id]}")
      redirect_to("/users/#{params[:user_id]}")
    elsif request.referer&.include?("/tags/#{params[:tag_id]}")
      redirect_to("/tags/#{params[:tag_id]}")
    else
      redirect_to("/posts/#{params[:post_id]}")
    end
  end

end
