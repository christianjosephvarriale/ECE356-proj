class CreateRegionalities < ActiveRecord::Migration[6.0]
  def change
    create_table :regionalities do |t|

      t.references :crime, foreign_key: true, null: false

      t.string :location
      t.string :lat 
      t.string :long 
      t.string :area

      t.timestamps
    end
  end
end
