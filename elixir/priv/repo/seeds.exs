# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SimpleSyrup.Repo.insert!(%SimpleSyrup.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
case SimpleSyrup.Repo.get_by(SimpleSyrup.User, email: "test_user@example.com") do
  nil ->
    SimpleSyrup.Repo.insert!(
      %SimpleSyrup.User{
        email: "test_user@example.com",
        first_name: "test",
        last_name: "user",
        avatar_url: "avatar.google.com"
      }
    )
  _ -> nil
end
