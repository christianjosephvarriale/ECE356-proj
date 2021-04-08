class CreateCrimes < ActiveRecord::Migration[6.0]
  def change
    create_table :crimes do |t|

      t.string :type, null: false
      t.string :description,  null: false
      t.string :date_rptd
      t.string :date_occured
      t.string :time_occured

      t.timestamps
    end
  end
end
