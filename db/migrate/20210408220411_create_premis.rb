class CreatePremis < ActiveRecord::Migration[6.0]
  def change
    create_table :premis do |t|

      t.references :crime, foreign_key: true, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
