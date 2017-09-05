defmodule SimpleSyrupWeb.Plugs.Auth do
  @moduledoc """
  Plug used to ensure users are logged in and loads user data from oauth provider
  """
  import Plug.Conn

  alias SimpleSyrup.{Repo, User}

  def init(opts) do
    opts
  end

  def call(%Plug.Conn{private: %{plug_session: %{current_user: _}}} = conn, _params) do
    conn
  end

  def call(conn, _opts) do
    conn
    |> assign(:current_user, get_or_create_user(conn))
  end

  defp get_or_create_user(%{assigns: %{current_user: current_user}}) do
    current_user
  end

  defp get_or_create_user(conn) do
    oauth_data = get_session(conn, :oauth_data)
    if oauth_data do
      user_changeset = case Repo.get_by(User, email: oauth_data.email) do
        nil -> %User{email: oauth_data.email}
        user -> user
      end

      user_changeset = User.changeset(
        user_changeset,
        build_changeset(oauth_data)
      )

      {:ok, user} =
        user_changeset
        |> Repo.insert_or_update

      user
    end
  end

  defp build_changeset(oauth_data) do
    oauth_data
    |> Enum.filter(fn({_, v}) -> v != nil end)
    |> Enum.into(%{})
  end
end
