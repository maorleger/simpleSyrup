# frozen_string_literal: true

class Participant < ApplicationRecord
  enum status: { invited: 0, tentative: 1, accepted: 2, declined: 3 }
  belongs_to :user, optional: true
  belongs_to :event
  has_many :expenses
  scope :possible_participants, -> {
    left_outer_joins(:user)
      .where
      .not(status: :declined)
      .order("status DESC, users.first_name, users.last_name, users.email, id") }
end
