Rails.application.routes.draw do
  resources :expenses
  devise_for :users
  resources :events

  root to: 'events#index'
end
