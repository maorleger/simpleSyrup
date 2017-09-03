defmodule SimpleSyrupWeb.Plugs.AuthTest do
  use SimpleSyrupWeb.ConnCase
  use Plug.Test

  import Ecto.Query
  alias SimpleSyrup.{User, Repo}

  test "without an oauth email assigns current_user to nil", %{conn: conn} do
    conn =
      conn
      |> init_test_session(%{})
      |> SimpleSyrupWeb.Plugs.Auth.call(%{})

    assert conn.assigns.current_user == nil
  end

  describe "with an oauth email" do
    test "creates a user if none exists", %{conn: conn} do
      new_user_email = "foo@example.com"
      assert Repo.get_by(User, email: new_user_email) == nil
      conn =
        conn
        |> init_test_session(oauth_email: new_user_email)
        |> SimpleSyrupWeb.Plugs.Auth.call(%{})

      inserted_user = Repo.get_by(User, email: new_user_email)
      assert conn.assigns.current_user == inserted_user
    end

    test "assigns the current user", %{conn: conn} do
      test_user = Repo.one(from x in User, limit: 1)
      conn =
        conn
        |> init_test_session(oauth_email: test_user.email)
        |> SimpleSyrupWeb.Plugs.Auth.call(%{})

      assert conn.assigns.current_user == test_user
    end
  end

  describe "with a current user" do
    test "passes the current user through", %{conn: conn} do
      conn =
        conn
        |> assign(:current_user, "test")
        |> SimpleSyrupWeb.Plugs.Auth.call(%{})

      assert conn.assigns.current_user == "test"
    end
  end
end
