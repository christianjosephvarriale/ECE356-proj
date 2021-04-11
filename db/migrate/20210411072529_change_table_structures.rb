class ChangeTableStructures < ActiveRecord::Migration[6.0]
  def change

    create_table :offences do |t|

      t.string :type, null: false

      t.timestamps
    end

    create_table :offence_crimes, {:id => false} do |t|

      t.references :offence, foreign_key: true, null: false
      t.references :crime, foreign_key: true, null: false

      t.timestamps
    end


    execute "ALTER TABLE offence_crimes ADD PRIMARY KEY (crime_id,offence_id);"
    remove_column :crimes, :description, :string
  end
end
