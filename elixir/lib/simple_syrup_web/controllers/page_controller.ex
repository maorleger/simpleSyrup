defmodule SimpleSyrupWeb.PageController do
  use SimpleSyrupWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def signup(conn, _params) do
    render conn, "signup.html"
  end
end
