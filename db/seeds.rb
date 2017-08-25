# Expense.destroy_all
# Participant.destroy_all
# Event.destroy_all
# User.destroy_all

[Expense, Participant, Event, User].each do |c|
  c.destroy_all
  c.reset_pk_sequence
end

event = Event.create!(
  name: 'Park Day!',
  description: 'Kicking it in the park',
  start_date: Date.today + 2.months,
  num_days: 1,
  lat: 39.698465,
  lng: -104.970771
)

ml = User.create!(
  email: 'ml@example.com',
  password: 'password',
  first_name: 'Major',
  last_name: 'Lazer'
)

er = User.create!(
  email: 'er@example.com',
  password: 'password',
  first_name: 'RealEstate',
  last_name: 'Guru'
)


p1 = Participant.create!(
  user: ml,
  event: event,
  status: 'accepted'
)

p2 = Participant.create!(
  user: er,
  event: event,
  status: 'declined'
)

p3 = Participant.create!(
  user: nil,
  event: event,
  status: 'invited'
)

e1 = Expense.create!(
  amount: 4.56,
  participant: p1,
  description: 'delicious chicken sausage!',
  date: Date.today
)

e2 = Expense.create!(
  amount: 23.95,
  participant: p1,
  description: 'Gas',
  date: Date.today - 5.days
)
