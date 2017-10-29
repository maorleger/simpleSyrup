# frozen_string_literal: true

class EventInvitationMailer < ApplicationMailer
  default from: "noreply@simplesyrup.com"

  def invitation_email(participant)
    @user = participant.user
    @event = participant.event
    mail(to: @user.email, subject: "You've been invited to some awesome event")
  end
end
