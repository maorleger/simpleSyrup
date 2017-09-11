# frozen_string_literal: true

class Expense < ApplicationRecord
  belongs_to :participant
  delegate :user, :event, to: :participant
end
