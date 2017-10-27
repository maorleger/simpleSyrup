# frozen_string_literal: true

Rails.application.routes.draw do

  post "/graphql", to: "graphql#execute"
  resources :events do
    resources :participants, only: [:create], via: [:post]
  end
end
