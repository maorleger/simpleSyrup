class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, default: "", null: false
      t.string :first_name
      t.string :last_name
      t.string :photo_url

      t.timestamps
    end
  end
end
