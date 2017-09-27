# frozen_string_literal: true

Rails.application.routes.draw do
  get "dashboard", controller: "dashboard", action: :index

  resources :expenses
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :events

  root to: "dashboard#index"
end
