json.extract! event, :id, :name, :description, :start_date, :num_days, :created_at, :updated_at, :lat, :lng, :participants
json.participants event.participants do |participant|
  json.id participant.id
  json.userId participant.user.id
  json.email participant.user.email
  json.firstName participant.user.first_name
  json.lastName participant.user.last_name
  json.status participant.status

  json.expenses participant.expenses do |expense|
    json.amount expense.amount
    json.date expense.date
  end
end

json.url event_url(event, format: :json)
