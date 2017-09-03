defmodule SimpleSyrupWeb.Plugs.Auth do
  @moduledoc """
  Plug used to ensure users are logged in and loads user data from oauth provider
  """
  import Plug.Conn

  alias SimpleSyrup.{Repo, User}

  def init(opts) do
    opts
  end

  def call(conn, _opts) do
    conn
    |> assign(:current_user, get_or_create_user(conn))
  end

  defp get_or_create_user(%{assigns: %{current_user: current_user}}) do
    current_user
  end

  defp get_or_create_user(conn) do
    email = get_session(conn, :oauth_email)
    if email do
      user_changeset = case Repo.get_by(User, email: email) do
        nil -> %User{email: email}
        user -> user
      end

      {:ok, user} =
        user_changeset
        |> User.changeset
        |> Repo.insert_or_update

      user
    end
  end
end
