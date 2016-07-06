class AddMoreInfoToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :description, :text
    add_column :users, :title, :string, { index: true }
    add_column :users, :public_email, :string
    add_column :users, :website, :text
  end
end
