defmodule SimpleSyrup.OAuth.Google do
  @moduledoc """
  Behaviour for the Google OAuth strategy.

  Allows for easier testing while still maintaining an explicit contract for the OAuth provide
  """
  alias OAuth2.Client

  @callback client :: %Client{}
  @callback authorize_url! :: String
  @callback get_token!(code :: String) :: String
  # credo:disable-for-next-line
  @callback get_user!(client :: Client) :: %{body: %{avatar_url: String, email: String, first_name: String, last_name: String}}
end
