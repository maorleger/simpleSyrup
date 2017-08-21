json.extract! expense, :id, :amount, :user_id, :date, :created_at, :updated_at
json.url expense_url(expense, format: :json)
