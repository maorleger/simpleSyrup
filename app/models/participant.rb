class Participant < ApplicationRecord
  enum status: [ :invited, :tentative, :accepted, :declined ]
  belongs_to :user
  belongs_to :event
end
