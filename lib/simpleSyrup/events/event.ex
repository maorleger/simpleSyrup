defmodule SimpleSyrup.Events.Event do
  @moduledoc """
  An event is the basic and main component for the application. It's a thing that someone wants to organize
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias SimpleSyrup.Events.Event

  schema "events" do
    field :description, :string
    field :name, :string
    field :num_days, :integer
    field :start_date, :date
    belongs_to :user, SimpleSyrup.Users.User

    timestamps()
  end

  @doc false
  def changeset(%Event{} = event, attrs) do
    event
    |> cast(attrs, [:name, :start_date, :num_days, :description])
    |> validate_required([:name, :start_date, :num_days, :description])
  end
end
