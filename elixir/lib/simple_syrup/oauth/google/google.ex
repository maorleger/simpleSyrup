defmodule SimpleSyrup.OAuth.Google do
  @moduledoc """
  Behaviour for the Google OAuth strategy.

  Allows for easier testing while still maintaining an explicit contract for the OAuth provide
  """
  alias OAuth2.Client

  @callback client :: %Client{}
  @callback authorize_url! :: Binary.t
  @callback get_token!(code :: String) :: Binary.t
  # credo:disable-for-next-line
  @callback get_user!(client :: Client.t) :: %{avatar_url: Binary.t, email: Binary.t, first_name: Binary.t, last_name: Binary.t}
end
