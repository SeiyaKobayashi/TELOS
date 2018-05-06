class CreateGroupIds < ActiveRecord::Migration[5.1]
  def change
    create_table :group_ids do |t|
      t.integer :tag_group_id

      t.timestamps
    end
  end
end
