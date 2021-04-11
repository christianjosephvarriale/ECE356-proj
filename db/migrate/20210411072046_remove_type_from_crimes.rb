class RemoveTypeFromCrimes < ActiveRecord::Migration[6.0]
  def change
    remove_column :crimes, :type 
  end
end
