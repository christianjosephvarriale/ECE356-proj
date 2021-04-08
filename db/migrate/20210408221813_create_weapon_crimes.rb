class CreateWeaponCrimes < ActiveRecord::Migration[6.0]
  def change
    create_table :weapon_crimes, {:id => false} do |t|

      t.references :weapon, foreign_key: true, null: false
      t.references :crime, foreign_key: true, null: false

      t.timestamps
    end

    execute "ALTER TABLE weapon_crimes ADD PRIMARY KEY (weapon_id,crime_id);"
  end
end
