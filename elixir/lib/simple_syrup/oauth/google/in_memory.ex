defmodule SimpleSyrup.OAuth.Google.InMemory do
  @moduledoc """

    Google OAuth Strategy

  """
  @behaviour SimpleSyrup.OAuth.Google

  alias OAuth2.Client
  alias OAuth2.Strategy.AuthCode

  def client do
    client(
      client_id: System.get_env("GOOGLE_CLIENT_ID"),
      client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
      redirect_uri: System.get_env("GOOGLE_REDIRECT_URI")
    )
  end

  def authorize_url!(params \\ []) do
    Client.authorize_url!(client(), params)
  end

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token!(_) do
    "test_token"
  end

  def get_user!(_) do
    %{email: "test@example.com"}
  end

  defp client(
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri
  ) do
    Client.new([
      strategy: __MODULE__,
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      site: "https://accounts.google.com",
      authorize_url: "https://accounts.google.com/o/oauth2/auth",
      token_url: "https://accounts.google.com/o/oauth2/token"
    ])
  end
end
