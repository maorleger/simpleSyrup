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
    # TODO: dont run this query all the time. Instead put the current user in the session 
    # and then bypass this if the current user is already in the session
    conn
    |> assign(:current_user, get_or_create_user(conn))
  end

  defp get_or_create_user(%{assigns: %{current_user: current_user}}) do
    current_user
  end

  defp get_or_create_user(conn) do
    email = get_session(conn, :oauth_email)
    user_data = get_session(conn, :user_data) || %{first_name: nil, last_name: nil, avatar_url: nil}
    if email do
      user_changeset = case Repo.get_by(User, email: email) do
        nil -> %User{email: email}
          # email: email,
          # first_name: user_data.first_name,
          # last_name: user_data.last_name,
          # avatar_url: user_data.avatar_url
        # }
        user -> user
      end

      user_changeset = User.changeset(user_changeset, %{first_name: user_data.first_name, last_name: user_data.last_name, avatar_url: user_data.avatar_url})

      {:ok, user} =
        user_changeset
        |> Repo.insert_or_update

      user
    end
  end
end
