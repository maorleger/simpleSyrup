defmodule SimpleSyrupWeb.Router do
  use SimpleSyrupWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug SimpleSyrupWeb.Plugs.Auth
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SimpleSyrupWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/signup", PageController, :signup
  end

  scope "/auth", SimpleSyrupWeb do
    pipe_through :browser

    get "/destroy", AuthController, :destroy
    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
  end

  scope "/app", SimpleSyrupWeb do
    pipe_through :browser

    get "/", AppController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", SimpleSyrupWeb do
  #   pipe_through :api
  # end
end
