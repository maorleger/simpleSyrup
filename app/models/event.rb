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

  def update_event(event_params)
    self.update(event_params.except(:users)) &&
    create_participants((event_params.dig(:users, :id) || []).map(&:to_i))
  end

  private

    def create_participants(new_participant_user_ids)
      (new_participant_user_ids - current_participant_user_ids).each do |user_id|
        self.participants.create(user_id: user_id)
      end
    end

    def new_participant_user_ids
      (event_params.dig(:users, :id) || []).map(&:to_i)
    end

    def current_participant_user_ids
      self.participants.map(&:user_id)
    end
    def start_date_cannot_be_in_the_past
      return unless start_date.present? && start_date < Time.zone.today
      errors.add(:start_date, "can't be in the past")
    end
end
