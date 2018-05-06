class AddPostIdToGroupIds < ActiveRecord::Migration[5.1]
  def change
    add_column :group_ids, :post_id, :integer
  end
end
