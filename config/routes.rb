# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users
  resources :events do
    resources :participants, only: [:create], via: [:post]
  end
  post "/graphql", to: "graphql#execute"
end
