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
  post 'posts/:id/tags/edit' => 'tags#edit'

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
  get 'users/:id/mylist' => 'users#index_mylist'
  get 'users/:id/relationships/following' => 'users#relationships_following'
  get 'users/:id/relationships/follower' => 'users#relationships_follower'
  get 'users/:id/relationships/following/private' => 'users#relationships_following_private'
  get 'users/:id/relationships/follower/private' => 'users#relationships_follower_private'

  get 'tags/index' => 'tags#index'
  get 'tags/:id' => 'tags#show'

  get 'likes/create'
  get 'likes/delete'
  post 'likes/create' => 'likes#create'
  post 'likes/delete' => 'likes#delete'

  get 'relationships/create'
  get 'relationships/delete'
  post 'relationships/create' => 'relationships#create'
  post 'relationships/delete' => 'relationships#delete'

end
