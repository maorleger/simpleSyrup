defmodule SimpleSyrup.OAuth.Google.LiveClient do
  @moduledoc """

    Google OAuth Strategy

  """
  @behaviour SimpleSyrup.OAuth.Google

  alias OAuth2.Client
  alias OAuth2.Strategy.AuthCode

  use OAuth2.Strategy

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

  def get_token!(code) do
    params = [code: code]
    Client.get_token!(client(), Keyword.merge(params, client_secret: client().client_secret))
  end

  def get_user!(client) do
    user_url = "https://www.googleapis.com/plus/v1/people/me/openIdConnect"
    %{body: user} = Client.get!(client, user_url)
    %{avatar_url: user["picture"], email: user["email"], first_name: user["given_name"], last_name: user["family_name"]}
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

  # strategy callbacks

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    client
    |> put_header("Accept", "application/json")
    |> AuthCode.get_token(params, headers)
  end
end
