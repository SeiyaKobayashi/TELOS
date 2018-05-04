class Post < ApplicationRecord
  validates :content, {presence: true, length:{maximum: 140}}
  validates :user_id, {presence: true}

  # User related to user_id of Post
  def user
    return User.find_by(id: self.user_id)
  end

end
