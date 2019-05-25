class Url < ApplicationRecord
	validates :storage_url, presence: true
end
