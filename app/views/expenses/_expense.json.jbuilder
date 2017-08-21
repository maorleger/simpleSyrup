json.extract! expense, :id, :amount, :participant, :date, :created_at, :updated_at
json.url expense_url(expense, format: :json)
