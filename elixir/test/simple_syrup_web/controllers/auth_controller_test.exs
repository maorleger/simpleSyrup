defmodule SimpleSyrupWeb.AuthControllerTest do
  use SimpleSyrupWeb.ConnCase
  use Plug.Test

  alias SimpleSyrupWeb.AuthController

  @google_api Application.get_env(:simple_syrup, :google_api)

  test "GET /auth/google", %{conn: conn} do
    conn = get conn, auth_path(conn, :index, "google")
    assert redirected_to(conn) =~ @google_api.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
  end

  test "#callback", %{conn: conn} do
    conn = 
      conn
      |> init_test_session(%{})
      |> AuthController.callback(%{"provider" => "google", "code" => "foo"})
    oauth_email = get_session(conn, :oauth_email)
    assert ^oauth_email = "test@example.com"
    assert redirected_to(conn) =~ page_path(conn, :index)
  end

end
