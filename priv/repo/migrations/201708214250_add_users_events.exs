defmodule SimpleSyrup.Repo.Migrations.AddUsersToEvents do
  use Ecto.Migration

  def change do
    alter table(:events) do
      add :user_id, references(:users, on_delete: :nothing)
    end
    create index(:events, [:user_id])
  end
end
