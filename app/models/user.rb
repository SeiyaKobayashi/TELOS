class User < ApplicationRecord
  # Simple validations
  validates:name, {presence: true}
  validates:email, {presence: true, uniqueness: true}
  validates:password, {presence: true}

  has_many :likes, dependent: :destroy

  # List of posts related to the given user_id
  def posts
    return Post.where(user_id: self.id)
  end

end
