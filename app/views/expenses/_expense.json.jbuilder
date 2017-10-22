# frozen_string_literal: true

json.extract! expense, :id, :amount, :participant, :description, :date, :created_at, :updated_at
json.url expense_url(expense, format: :json)
