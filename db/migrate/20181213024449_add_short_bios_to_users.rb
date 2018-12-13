class AddShortBiosToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :short_bio, :text
  end
end
