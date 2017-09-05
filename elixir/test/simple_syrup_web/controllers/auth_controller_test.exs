defmodule SimpleSyrupWeb.AuthControllerTest do
  use SimpleSyrupWeb.ConnCase
  use Plug.Test

  alias SimpleSyrupWeb.AuthController

  @google_api Application.get_env(:simple_syrup, :google_api)

  test "GET /auth/google", %{conn: conn} do
    conn = get conn, auth_path(conn, :index, "google")
    assert redirected_to(conn) =~ @google_api.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
  end

  test "GET /auth/destroy", %{conn: conn} do
    conn =
      conn
      |> init_test_session(oauth_data: %{email: "test@example.com"})
      |> get("/auth/destroy")

    assert redirected_to(conn) == page_path(conn, :index)
    assert get_session(conn, :oauth_data) == nil
  end

  test "#callback", %{conn: conn} do
    conn = 
      conn
      |> init_test_session(%{})
      |> AuthController.callback(%{"provider" => "google", "code" => "foo"})

    oauth_email = get_session(conn, :oauth_data).email
    user_profile = get_session(conn, :oauth_data)
    assert ^oauth_email = "test@example.com"
    assert ^user_profile = %{avatar_url: "https://foo.bar", email: "test@example.com", first_name: "test", last_name: "example"}
    assert redirected_to(conn) =~ page_path(conn, :index)
  end
end
