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
        |> init_test_session(
          oauth_email: new_user_email,
          user_data: %{
            avatar_url: "https://google.com",
            first_name: "foo",
            last_name: "bar"
          }
        )
        |> SimpleSyrupWeb.Plugs.Auth.call(%{})

      inserted_user = Repo.get_by(User, email: new_user_email)
      current_user = conn.assigns.current_user

      assert current_user.email == inserted_user.email
      assert current_user.avatar_url == inserted_user.avatar_url
      assert current_user.first_name == inserted_user.first_name
      assert current_user.last_name == inserted_user.last_name
    end

    test "assigns the current user", %{conn: conn} do
      test_user = Repo.one(from x in User, limit: 1)
      conn =
        conn
        |> init_test_session(
          oauth_email: test_user.email,
          user_data: %{
            first_name: test_user.first_name,
            last_name: test_user.last_name,
            avatar_url: test_user.avatar_url
          }
        )
        |> SimpleSyrupWeb.Plugs.Auth.call(%{})

      assert conn.assigns.current_user.email == test_user.email
      assert conn.assigns.current_user.avatar_url == test_user.avatar_url
      assert conn.assigns.current_user.first_name == test_user.first_name
      assert conn.assigns.current_user.last_name == test_user.last_name
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
