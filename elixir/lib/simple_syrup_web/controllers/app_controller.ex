defmodule SimpleSyrupWeb.AppController do
  use SimpleSyrupWeb, :controller

  plug :authenticate

  def index(conn, _params) do
    conn
    |> render("index.html")
  end

  def authenticate(conn, _opts) do
    case conn.assigns.current_user do
      nil ->
        conn
        |> put_flash(:error, "You'll need to sign in in order to see this event. But don't worry! You can easily sign in or join with Google")
        |> redirect(to: page_path(conn, :signup))
        |> halt()
      _ ->
        conn
    end
  end
end
