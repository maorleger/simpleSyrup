# frozen_string_literal: true

json.extract!(
  event,
  :id,
  :name,
  :description,
  :start_date,
  :num_days,
  :end_date,
  :created_at,
  :updated_at,
  :lat,
  :lng,
  :participants
)

binding.pry
json.participants event.participants.possible_participants do |participant|
  json.id participant.id
  json.userId participant.user_id
  json.eventId participant.event_id
  json.status participant.status

  json.user do
    json.email participant.user.try(:email) || "irina@example.com"
    json.firstName participant.user.try(:first_name)
    json.lastName participant.user.try(:last_name)
    json.photoUrl participant.user.try(:picture)
  end
end

json.url event_url(event, format: :json)
