class CreateVictims < ActiveRecord::Migration[6.0]
  def change
    create_table :victims do |t|

      t.string :sex
      t.string :descent
      t.integer :age

      t.timestamps
    end
  end
end
