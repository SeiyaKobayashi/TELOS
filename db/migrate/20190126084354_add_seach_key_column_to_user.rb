class AddSeachKeyColumnToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :search_key, :string
  end
end
