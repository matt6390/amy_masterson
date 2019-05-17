Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/mosaics" => 'mosaics#index'
  get "/mosaics/:id" => 'mosaics#show'
  post "/mosaics" => 'mosaics#create'
  patch "/mosaics/:id" => 'mosaics#update'
  delete "/mosaics/:id" => 'mosaics#destroy'
end
