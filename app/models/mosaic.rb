class Mosaic < ApplicationRecord
  validates :name, :description, :price, presence: true
  validates :price, numericality: true

  def friendly_created_at
    created_at.strftime("%e %b %Y %H:%M:%S%p")
  end

  def friendly_updated_at
    updated_at.strftime("%e %b %Y %H:%M:%S%p")
  end
end
