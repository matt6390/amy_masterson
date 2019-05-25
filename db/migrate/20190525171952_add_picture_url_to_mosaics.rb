class AddPictureUrlToMosaics < ActiveRecord::Migration[5.2]
  def change
  	add_column :mosaics, :picture_url, :string
  end
end
