defmodule SimpleSyrup.Users.User do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset
  alias SimpleSyrup.Users.User

  schema "users" do
    field :email, :string
    field :name, :string
    field :username, :string
    has_many :events, SimpleSyrup.Events.Event

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:username, :email, :name])
    |> validate_required([:username, :email, :name])
  end
end
