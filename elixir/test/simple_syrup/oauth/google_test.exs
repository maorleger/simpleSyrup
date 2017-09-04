defmodule SimpleSyrup.OAuth.GoogleTest do
  use SimpleSyrup.DataCase

  @google_api Application.get_env(:simple_syrup, :google_api)

  setup_all do
    System.put_env("GOOGLE_CLIENT_ID", "test_client")
    System.put_env("GOOGLE_CLIENT_SECRET", "test_secret")
    System.put_env("GOOGLE_REDIRECT_URI", "test_uri")
  end

  test "client" do
    client = @google_api.client
    assert ^client = %OAuth2.Client{
      strategy: SimpleSyrup.OAuth.Google.InMemory,
      client_id: "test_client",
      client_secret: "test_secret",
      redirect_uri: "test_uri",
      site: "https://accounts.google.com",
      authorize_url: "https://accounts.google.com/o/oauth2/auth",
      token_url: "https://accounts.google.com/o/oauth2/token"
    }
  end

  test "authorize_url!" do
    url = @google_api.authorize_url!(param: "test")
    assert ^url = "https://accounts.google.com/o/oauth2/auth?client_id=test_client&param=test&redirect_uri=test_uri&response_type=code"
  end

  test "get_user!" do
    user = @google_api.get_user!(%{})
    user_keys = 
      user
      |> Map.keys
      |> Enum.sort

    assert user_keys == [:avatar_url, :email, :first_name, :last_name]
  end
end
