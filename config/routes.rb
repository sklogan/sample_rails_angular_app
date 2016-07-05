Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'registrations'}
  as :user do
	  put 'users' => 'devise/registrations#update'               
	end

  resources :posts
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
  root 'posts#index'
end
