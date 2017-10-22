# frozen_string_literal: true

class Expense < ApplicationRecord
  belongs_to :participant
  delegate :user, to: :participant
  delegate :event, to: :participant
end
