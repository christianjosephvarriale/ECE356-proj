class AddIndicesToCols < ActiveRecord::Migration[6.0]
  def change
    add_index :offences, :description
    add_index :premis, :description
    add_index :weapons, :description

    change_column :victims, :sex, :string, null: false
    change_column :victims, :descent, :string, null: false
    change_column :victims, :age, :string, null: false


    change_column :crimes, :date_rptd, :string, null: false
    change_column :crimes, :date_occured, :string, null: false
    change_column :crimes, :time_occured, :string, null: false


    change_column :regionalities, :area, :string, null: false
    change_column :regionalities, :long, :string, null: false
    change_column :regionalities, :lat, :string, null: false
    change_column :regionalities, :location, :string, null: false

    
  end
end
