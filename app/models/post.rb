class Post < ApplicationRecord
  validates :content, {presence: true, length:{maximum: 140}}
  validates :user_id, {presence: true}

  has_many :likes, dependent: :destroy

  # User related to user_id of Post
  def user
    return User.find_by(id: self.user_id)
  end

  # Tags related to id of Post
  def tags
    return Tag.where(group_id: self.tag_group_id)
  end

end
