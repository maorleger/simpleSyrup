# frozen_string_literal: true

require "rails_helper"

RSpec.describe EventInvitationMailer, type: :mailer do
  describe "#send_invitation_email" do
    let(:user) { create(:user) }
    let(:event) { create(:event) }
    let(:participant) { create(:participant, event: event, user: user) }
    let(:mail) { described_class.invitation_email(participant).deliver_now }

    describe "when the user is valid" do
      it "renders the subject" do
        expect(mail.subject).to eq("You've been invited to some awesome event")
      end

      it "renders the receiver email" do
        expect(mail.to).to eq([user.email])
      end

      it "assigns @user" do
        expect(mail.body.encoded).to match(user.first_name)
      end

      it "assigns @event" do
        expect(mail.body.encoded).to match(event.name)
      end
    end
  end
end
