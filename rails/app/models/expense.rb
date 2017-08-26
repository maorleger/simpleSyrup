class Expense < ApplicationRecord
  belongs_to :participant

  def user
    participant.user
  end

  def event
    participant.event
  end


end
