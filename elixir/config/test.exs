use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :simple_syrup, SimpleSyrupWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :simple_syrup, SimpleSyrup.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "simple_syrup_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :simple_syrup, :google_api, SimpleSyrup.OAuth.Google.InMemory
