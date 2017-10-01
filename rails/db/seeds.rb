# Expense.destroy_all
# Participant.destroy_all
# Event.destroy_all
# User.destroy_all

[Expense, Participant, Event, User].each do |c|
  c.destroy_all
  c.reset_pk_sequence
end

event = Event.create!(
  description: "Kicking it in the park",
  lat: 39.698465,
  lng: -104.970771,
  name: "Park Day!",
  num_days: 1,
  start_date: Time.zone.today + 2.months,
)

ml = User.create!(
  email: "ml@example.com",
  first_name: "Major",
  last_name: "Lazer",
  password: "password",
)

er = User.create!(
  authentication_token: "EricsToken",
  email: "er@example.com",
  first_name: "RealEstate",
  last_name: "Guru",
  password: "password",
)

p1 = Participant.create!(
  event: event,
  status: "accepted",
  user: ml,
)

Participant.create!(
  event: event,
  status: "declined",
  user: er,
)

Participant.create!(
  event: event,
  status: "invited",
  user: nil,
)

Expense.create!(
  amount: 4.56,
  date: Time.zone.today,
  description: "delicious chicken sausage!",
  participant: p1,
)

Expense.create!(
  amount: 23.95,
  date: Time.zone.today - 5.days,
  description: "Gas",
  participant: p1,
)

Event.create!(
  description: "I havent invited anyone nor did I set anything up",
  name: "My far future event",
  num_days: 5,
  start_date: Time.zone.today + 2.years,
)
