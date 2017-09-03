defmodule SimpleSyrup.User do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset
  alias SimpleSyrup.User

  schema "users" do
    field :avatar_url, :string
    field :email, :string
    field :first_name, :string
    field :last_name, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs \\ %{}) do
    user
    |> cast(attrs, [:email, :first_name, :last_name, :avatar_url])
    |> validate_required([:email])
  end
end
