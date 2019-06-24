Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/mosaics" => 'mosaics#index'
  get "/mosaics/test" => 'mosaics#test'
  get "/mosaics/:id" => 'mosaics#show'
  post "/mosaics" => 'mosaics#create'
  patch "/mosaics/:id" => 'mosaics#update'
  delete "/mosaics/:id" => 'mosaics#destroy'

  get "/urls" => 'urls#index'
  get "/urls/last" => 'urls#last'
  get "/urls/:id" => 'urls#show'
  post "/urls" => 'urls#create'
  patch "/urls/:id" => 'urls#update'
  delete "/urls/:id" => 'urls#destroy'

  get "/users/amy" => 'users#amy'
  post "/users" => 'users#create'
  post 'user_token' => 'user_token#create'
end
