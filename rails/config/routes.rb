# frozen_string_literal: true

Rails.application.routes.draw do
  get "dashboard/index"

  resources :expenses
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :events

  root to: "events#index"
end
