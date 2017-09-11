# frozen_string_literal: true

class Participant < ApplicationRecord
  enum status: %i[invited tentative accepted declined]
  belongs_to :user, optional: true
  belongs_to :event
  has_many :expenses
end
