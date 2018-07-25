Rails.application.routes.draw do

  get '/' => 'home#top'
  get 'about' => 'home#about'

  get 'posts/index' => "posts#index"
  get 'posts/new' => 'posts#new'
  post 'posts/create' => 'posts#create'
  get 'posts/:id' => 'posts#show'
  get 'posts/:id/edit' => 'posts#edit'
  post 'posts/:id/update' => 'posts#update'
  post 'posts/:id/delete' => 'posts#delete'
  get 'posts/:id/tags' => 'tags#new'
  post 'posts/:id/tags/create' => 'tags#create'
  get 'posts/search' => 'posts#search'

  get 'users/index' => 'users#index'
  get "signup" => "users#new"
  post "users/create" => "users#create"
  get 'users/:id' => 'users#show'
  get "users/:id/edit" => "users#edit"
  post "users/:id/update" => "users#update"
  get "login" => "users#login_form"
  post "login" => "users#login"
  post "logout" => "users#logout"

  get 'tags/index' => 'tags#index'
  get 'tags/:id' => 'tags#show'

end
