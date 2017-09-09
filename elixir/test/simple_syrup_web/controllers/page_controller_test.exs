defmodule SimpleSyrupWeb.PageControllerTest do
  use SimpleSyrupWeb.ConnCase
  use Plug.Test

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end

  describe "User management" do
    test "shows a link to login with Google", %{conn: conn} do
      conn = get conn, "/"
      assert html_response(conn, 200) =~ "Sign in with Google"
    end

    test "shows a link to logout with logged in user", %{conn: conn} do
      conn =
        conn
        |> init_test_session(oauth_data: %{email: "test@example.com"})
        |> get("/")

      assert html_response(conn, 200) =~ "Sign out"
    end
  end

  test "GET /signup", %{conn: conn} do
    conn = get conn, "/signup"
    assert html_response(conn, 200) =~ "Sign up with Google"
  end
end
