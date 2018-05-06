class AddTagIdToGroupIds < ActiveRecord::Migration[5.1]
  def change
    add_column :group_ids, :tag_id, :integer
  end
end
