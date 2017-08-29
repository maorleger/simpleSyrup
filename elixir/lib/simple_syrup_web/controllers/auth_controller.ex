defmodule SimpleSyrupWeb.AuthController do
  use SimpleSyrupWeb, :controller

  alias SimpleSyrup.OAuth.Google

  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  defp authorize_url!("google") do
    Google.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
  end

  defp authorize_url!(provider) do
    raise "No matching provider for #{provider} in authorize_url!"
  end
end
