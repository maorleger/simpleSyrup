# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :event

  enum status: { invited: 0, tentative: 1, accepted: 2, declined: 3 }

  scope :possible_participants, -> {
    left_outer_joins(:user)
      .where.not(status: :declined)
      .order("status DESC, users.first_name, users.last_name, users.email, id")
  }
  after_create :invite_to_event

  def invite_to_event
    EventInvitationMailer.invitation_email(self).deliver_now if whitelisted?
  end

  private

    def whitelisted?
      (ENV["WHITELISTED_EMAILS"] || "").split("|").include?(user&.email)
    end
end
