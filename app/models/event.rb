# frozen_string_literal: true

class Event < ApplicationRecord
  attribute :num_days, default: 1
  validates :num_days, numericality: { greater_than: 0 }
  validates :name, presence: true
  validate :start_date_cannot_be_in_the_past
  has_many :participants, dependent: :destroy

  def end_date
    start_date + (num_days - 1).days if start_date.present?
  end

  private

    def start_date_cannot_be_in_the_past
      return unless start_date.present? && start_date < Time.zone.today
      errors.add(:start_date, "can't be in the past")
    end
end
