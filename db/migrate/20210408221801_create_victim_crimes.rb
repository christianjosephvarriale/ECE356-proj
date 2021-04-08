class CreateVictimCrimes < ActiveRecord::Migration[6.0]
  def change
    create_table :victim_crimes, {:id => false} do |t|

      t.references :victim, foreign_key: true, null: false
      t.references :crime, foreign_key: true, null: false

      t.timestamps
    end

    execute "ALTER TABLE victim_crimes ADD PRIMARY KEY (victim_id,crime_id);"
  end
end
