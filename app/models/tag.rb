class Tag < ApplicationRecord
  validates :label, {presence: true}
  validates :post_id, {presence: true}

  # Store multiple post IDs in a single tag label
  def posts
    return Post.where(tag_group_id: self.group_id)
  end

end
