defmodule SimpleSyrup.OAuth.GoogleTest do
  use SimpleSyrup.DataCase
  alias SimpleSyrup.OAuth.Google

  setup_all do
    System.put_env("GOOGLE_CLIENT_ID", "test_client")
    System.put_env("GOOGLE_CLIENT_SECRET", "test_secret")
    System.put_env("GOOGLE_REDIRECT_URI", "test_uri")
  end

  test "client" do
    client = Google.client
    assert ^client = %OAuth2.Client{
      strategy: SimpleSyrup.OAuth.Google,
      client_id: "test_client",
      client_secret: "test_secret",
      redirect_uri: "test_uri",
      site: "https://accounts.google.com",
      authorize_url: "https://accounts.google.com/o/oauth2/auth",
      token_url: "https://accounts.google.com/o/oauth2/token"
    }
  end

  test "authorize_url!" do
    url = Google.authorize_url!(param: "test")
    assert ^url = "https://accounts.google.com/o/oauth2/auth?client_id=test_client&param=test&redirect_uri=test_uri&response_type=code"
  end
end
