class CreateExpenses < ActiveRecord::Migration[5.1]
  def change
    create_table :expenses do |t|
      t.decimal :amount, :precision => 8, :scale => 2
      t.references :participant, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
