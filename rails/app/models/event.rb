# frozen_string_literal: true

class Event < ApplicationRecord
  validates :num_days, numericality: { greater_than: 0 }
  validates :name, presence: true
  validate :start_date_cannot_be_in_the_past

  has_many :participants
  has_many :users, through: :participants
  has_many :expenses, through: :participants

  has_many :tasks

  def start_date_cannot_be_in_the_past
    return unless start_date.blank? || start_date < Time.zone.today
    errors.add(:start_date, "can't be in the past")
  end

  def end_date
    start_date + (num_days - 1).days
  end
end
