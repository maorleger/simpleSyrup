class Participant < ApplicationRecord
  enum status: [ :invited, :tentative, :accepted, :declined ]
  belongs_to :user, optional: true
  belongs_to :event
  has_many :expenses
end
