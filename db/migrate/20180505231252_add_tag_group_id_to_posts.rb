class AddTagGroupIdToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :tag_group_id, :integer
  end
end
