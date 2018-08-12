Rails.application.routes.draw do

  get '/' => 'home#top'
  get 'about' => 'home#about'

  get 'posts/index' => 'posts#index'
  get 'posts/new' => 'posts#new'
  post 'posts/create' => 'posts#create'
  get 'posts/:id' => 'posts#show'
  get 'posts/:id/edit' => 'posts#edit'
  post 'posts/:id/update' => 'posts#update'
  post 'posts/:id/delete' => 'posts#delete'
  get 'posts/:id/tags' => 'tags#new'
  post 'posts/:id/tags/create' => 'tags#create'
  post 'posts/:id/tags/delete' => 'tags#delete'
  # get 'posts/search' => 'posts#search'

  get 'users/index' => 'users#index'
  get 'signup' => 'users#new'
  post 'users/create' => 'users#create'
  get 'users/:id' => 'users#show'
  get 'users/:id/edit' => 'users#edit'
  post 'users/:id/update' => 'users#update'
  get 'login' => 'users#login_form'
  post 'login' => 'users#login'
  post 'logout' => 'users#logout'
  post 'users/:id/delete' => 'users#delete'
  # get 'users/search' => 'users#search'

  get 'tags/index' => 'tags#index'
  get 'tags/:id' => 'tags#show'
  # get 'tags/search' => 'tags#search'

end
