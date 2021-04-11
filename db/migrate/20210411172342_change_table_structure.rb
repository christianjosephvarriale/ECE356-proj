class ChangeTableStructure < ActiveRecord::Migration[6.0]
  def change

    create_table :premis_crimes, {:id => false} do |t|

      t.references :premis, foreign_key: true, null: false
      t.references :crime, foreign_key: true, null: false

      t.timestamps
    end

    remove_column :premis, :crime_id, :bigint
    execute "ALTER TABLE premis_crimes ADD PRIMARY KEY (premis_id,crime_id);"
   
  end
end
