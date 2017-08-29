defmodule SimpleSyrupWeb.AuthControllerTest do
  use SimpleSyrupWeb.ConnCase
  alias SimpleSyrup.OAuth.Google

  test "GET /auth/google", %{conn: conn} do
    conn = get conn, auth_path(conn, :index, "google")
    assert redirected_to(conn) =~ Google.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
  end

end
