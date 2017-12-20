[Participant, Event, User].each do |c|
  c.destroy_all
end

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
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
  photo_url: "http://lorempixel.com/400/200/cats/"
)

er = User.create!(
  email: "er@example.com",
  first_name: "RealEstate",
  last_name: "Guru",
  photo_url: "http://lorempixel.com/400/200/cats/"
)

rl = User.create!(
  email: "rl@example.com",
  first_name: "Regina",
  last_name: "George",
  photo_url: "http://lorempixel.com/400/200/cats/"
)

Participant.create!(
  event: event,
  status: "attending",
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
  user: rl,
)

Event.create!(
  description: "I havent invited anyone nor did I set anything up",
  name: "My far future event",
  num_days: 5,
  start_date: Time.zone.today + 2.years,
)
