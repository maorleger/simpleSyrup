# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :simpleSyrup,
  ecto_repos: [SimpleSyrup.Repo]

# Configures the endpoint
config :simpleSyrup, SimpleSyrupWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "49YIZr5IF0UnmD0Mw4jZC116YKuchLWFg9ksl4t7yTl/ZXYhJVGU3j0V0Y6MJxn8",
  render_errors: [view: SimpleSyrupWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: SimpleSyrup.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
