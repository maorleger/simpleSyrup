defmodule SimpleSyrupWeb.PageController do
  use SimpleSyrupWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
