defmodule SimpleSyrupWeb.PageControllerTest do
  use SimpleSyrupWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end

  describe "User management" do
    test "shows a link to login with Google", %{conn: conn} do
      conn = get conn, "/"
      assert html_response(conn, 200) =~ "Sign in with Google"
    end
  end
end
