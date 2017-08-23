class Event < ApplicationRecord
  validates :num_days, numericality: { greater_than: 0}
  validate :start_date_cannot_be_in_the_past
  validates_presence_of :name

  has_many :participants
  has_many :users, through: :participants
  has_many :expenses, through: :participants

  has_many :tasks

  def start_date_cannot_be_in_the_past
    if start_date.present? && start_date < Date.today
      errors.add(:start_date, "can't be in the past")
    end
  end
end
