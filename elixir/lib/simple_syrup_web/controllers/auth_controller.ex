defmodule SimpleSyrupWeb.AuthController do
  use SimpleSyrupWeb, :controller

  @google_api Application.get_env(:simple_syrup, :google_api)

  @spec index(Plug.Conn.t, %{}) :: Plug.Conn.t
  def index(conn, %{"provider" => provider}) do
    redirect conn, external: authorize_url!(provider)
  end

  @spec destroy(Plug.Conn.t, %{}) :: Plug.Conn.t
  def destroy(conn, _params) do
    conn
    |> delete_session(:oauth_data)
    |> delete_session(:access_token)
    |> redirect(to: page_path(conn, :index))
  end

  @spec authorize_url!(String.t) :: String.t
  defp authorize_url!("google") do
    @google_api.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
  end

  defp authorize_url!(provider) do
    raise "No matching provider for #{provider} in authorize_url!"
  end

  def callback(conn, %{"provider" => provider, "code" => code}) do
    client = get_token!(provider, code)
    user = get_user!(provider, client)

    conn
    |> put_session(:oauth_data, user)
    |> configure_session(renew: true)
    |> redirect(to: page_path(conn, :index))
  end

  defp get_token!("google", code) do
    @google_api.get_token!(code)
  end

  defp get_token!(provider, code) do
    raise "No matching provider for #{provider} with code #{code} in get_token!"
  end

  defp get_user!("google", client) do
    @google_api.get_user!(client)
  end

  defp get_user!(provider, _) do
    raise "No matching provider for #{provider} in get_user!"
  end
end
