class User < ApplicationRecord
  # Simple validations
  validates:name, {presence: true}
  validates:email, {presence: true, uniqueness: true}
  validates:password, {presence: true}

  has_many :likes, dependent: :destroy

  # Array of posts given user_id
  def posts
    return Post.where(user_id: self.id)
  end

  # Array of likes given user_id
  def likes
    return Like.where(user_id: self.id)
  end

end
