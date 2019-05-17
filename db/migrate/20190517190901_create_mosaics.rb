class CreateMosaics < ActiveRecord::Migration[5.2]
  def change
    create_table :mosaics do |t|
      t.string :name
      t.string :description
      t.integer :price

      t.timestamps
    end
  end
end
