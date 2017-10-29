# frozen_string_literal: true

class EventInvitationMailer < ApplicationMailer
  default from: "noreply@simplesyrup.com"

  def invitation_email(user)
    @user = user
    mail(to: @user.email, subject: "You've been invited to some awesome event")
  end
end
