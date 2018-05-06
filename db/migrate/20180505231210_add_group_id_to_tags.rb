class AddGroupIdToTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :group_id, :integer
  end
end
