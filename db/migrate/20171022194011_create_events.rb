class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.date :start_date
      t.integer :num_days
      t.decimal :lat
      t.decimal :lng

      t.timestamps
    end
  end
end
