# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  get "dashboard", controller: "dashboard", action: :index

  resources :expenses
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :events

  root to: "dashboard#index"
end
