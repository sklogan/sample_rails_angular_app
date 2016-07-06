class CreateSocialLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :social_links do |t|
      t.string :network
      t.text :link
      t.references :user

      t.timestamps
    end
  end
end
