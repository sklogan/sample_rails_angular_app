Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  mount ActionCable.server => '/cable'
  devise_for :users, controllers: {registrations: 'registrations'}
  as :user do
    put 'users' => 'devise/registrations#update'               
  end
  resources :users, only: [:show]

  resources :posts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
  root 'posts#index'
end
