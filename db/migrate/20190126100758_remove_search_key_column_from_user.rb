class RemoveSearchKeyColumnFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :search_key, :string
  end
end
