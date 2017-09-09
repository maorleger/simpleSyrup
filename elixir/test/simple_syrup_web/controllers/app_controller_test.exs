defmodule SimpleSyrupWeb.AppControllerTest do
  use SimpleSyrupWeb.ConnCase
  use Plug.Test

  describe "when the user is not logged in" do
    test "GET /app should redirect to main page", %{conn: conn} do
      conn = get conn, app_path(conn, :index)
      assert redirected_to(conn) == page_path(conn, :index)
      assert conn.halted
      assert get_flash(conn, :error) == "Please login to continue"
    end
  end

  describe "when the user is logged in" do
    test "GET /event should load correctly", %{conn: conn} do
      conn =
        conn
        |> init_test_session(oauth_data: %{email: "test@example.com"})
        |> get(app_path(conn, :index))

      assert html_response(conn, 200) =~ "<ssRoot></ssRoot>"
    end
  end
end
