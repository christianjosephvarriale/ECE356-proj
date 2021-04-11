class ChangeTypeToDesc < ActiveRecord::Migration[6.0]
  def change
    rename_column :offences, :type, :description
  end
end
