# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :events do
        resources :participants, only: [:create], via: [:post]
      end
      post "/graphql", to: "graphql#execute"
    end
  end

  resources :sessions, only: [:index, :create, :destroy]
  get "/login", to: redirect("/auth/google_oauth2"), as: "login"
  get "/logout", to: "sessions#destroy", as: "logout"
  get "/auth/:provider/callback", to: "sessions#create"
  get "/auth/failure", to: redirect("/")

  resource :home, only: [:show]
  root to: "home#show"
  get "*a", to: "home#show"
end
