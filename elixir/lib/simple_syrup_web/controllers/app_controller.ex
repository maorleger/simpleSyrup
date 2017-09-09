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
        |> put_flash(:error, "Please login to continue")
        |> redirect(to: page_path(conn, :index))
        |> halt()
      _ ->
        conn
    end
  end
end
