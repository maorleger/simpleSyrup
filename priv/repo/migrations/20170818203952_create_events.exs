defmodule SimpleSyrup.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :name, :string
      add :start_date, :date
      add :num_days, :integer
      add :description, :string

      timestamps()
    end

  end
end
