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

json.participants event.participants.possible_participants do |participant|
  json.id participant.id
  json.userId participant.user_id
  json.eventId participant.event_id
  json.status participant.status

  json.user do
    json.email participant.user&.email || "irina@example.com"
    json.firstName participant.user&.first_name
    json.lastName participant.user&.last_name
    json.photoUrl participant.user&.photo_url
  end
end

json.url event_url(event, format: :json)
