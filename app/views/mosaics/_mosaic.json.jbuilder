json.id mosaic.id
json.name mosaic.name
json.description mosaic.description
json.price mosaic.price
json.picture_url url_for(mosaic.image)
# json.image mosaic.image
json.updated_at mosaic.friendly_updated_at
json.created_at mosaic.friendly_created_at