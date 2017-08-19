json.extract! event, :id, :name, :description, :start_date, :num_days, :created_at, :updated_at
json.url event_url(event, format: :json)
