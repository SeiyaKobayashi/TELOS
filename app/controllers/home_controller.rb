class HomeController < ApplicationController

  def top
    @sample_posts = Post.all
  end

  def about
  end

end
