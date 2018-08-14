class PostsController < ApplicationController

  before_action :authenticate_user
  before_action :ensure_correct_user, {only:[:edit, :update, :delete]}

  # Show all posts in descending order (new -> old)
  def index
    @posts = Post.all.order(updated_at: :desc)
    if params[:key] != ""
        @posts = search(@posts)
    end
  end

  # Search posts
  def search(posts)
      keyword = params[:key]
      posts = posts.where('content like ?', "%#{keyword}%")
      if posts.length == 0
          flash[:notice] = "No matches. Please try other keywords."
          redirect_back(fallback_location: "/posts/index")
      end
      return posts
  end

  # Show post details (user, date, tags etc.)
  def show
    @post = Post.find_by(id: params[:id])
    @user = @post.user
    @tags = GroupId.where(post_id: @post.id)     # Search GroupId model, given @post.id
    @tags_new = Array.new     # Array to store tags
    @tag_bit = 0     # Bit that represents whether post have any tags

    if @tags.length != 0
      @tag_bit = 1
      @tags.each do |tag|
        @tags_new.push(Tag.find_by(id: tag.tag_id))
      end
    end
  end

  # Create a new post
  def new
    @post = Post.new(content: params[:content])
  end

  # create is called from "posts/new.html.erb"
  def create
    @post = Post.new(content: "#{params[:word]}: #{params[:definition]}\r\n#{params[:sentence]}",
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

  # update is called from "posts/edit.html.erb"
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

  # delete is called from "posts/show.html.erb"
  def delete
    @post = Post.find_by(id: params[:id])
    post_gid = GroupId.find_by(post_id: @post.id)

    # If post has no tags
    if post_gid == nil
        @post.destroy
        flash[:notice] = "Your post has been deleted."
        redirect_to("/posts/index")
    else
        tags = Tag.where(post_id: @post.id)
        if tags.length == 1
            delete_inner(tags[0])
        else
            tags.each do |tag|
                delete_inner(tag)
            end
        end
        # After unlinking tags from post, simply destroy that post
        @post.destroy
        flash[:notice] = "Your post has been deleted."
        redirect_to("/posts/index")
    end
  end

  def delete_inner(tag)
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
              if tag_n.post_id == @post.id
                  gid = GroupId.find_by(tag_id: tag_n.id)
                  gid.destroy
                  tag_n.destroy
              else
                  next
              end
          end
      end
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
