# frozen_string_literal: true

require "rails_helper"

RSpec.describe Participant, type: :model do
  specify { is_expected.to belong_to(:event) }
  specify { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:event_id) }
  specify { is_expected.to belong_to(:user) }

  describe "#status" do
    specify do
      is_expected
        .to define_enum_for(:status)
        .with([:invited, :tentative, :attending, :declined])
    end
  end

  subject do
    create(:participant)
  end

  describe "#possible_participants" do
    let!(:event) { create(:event) }

    let!(:declined) { create(:participant, status: :declined, event: event) }
    let!(:invited) { create(:participant, status: :invited, event: event) }
    let!(:tentative) { create(:participant, status: :tentative, event: event) }
    let!(:attending) { create(:participant, status: :attending, event: event) }

    it "excludes declined users" do
      expect(event.participants.possible_participants).not_to include(declined)
    end

    it "sorts the participants by status" do
      expect(event.participants.possible_participants).to eq([attending, tentative, invited])
    end
  end

  describe "delegators" do
    USER_DELEGATORS = [:first_name, :last_name, :email, :photo_url]

    USER_DELEGATORS.each do |delegator|
      it "delegates #{delegator} to user" do
        expect(subject.public_send(delegator)).to eq(subject.user.public_send(delegator))
      end

      describe "when user is nil" do
        before do
          subject.user = nil
        end

        it "does not blow up for #{delegator}" do
          expect do
            subject.public_send(delegator)
          end.not_to raise_error
        end

        it "returns nil" do
          expect(subject.public_send(delegator)).to be_nil
        end
      end
    end
  end

  describe "#invite_to_event" do
    it "sends an email to the user" do
      allow(subject).to receive(:whitelisted?).and_return(true)
      expect do
        subject.invite_to_event
      end.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    describe "when the user is not whitelisted" do
      it "does not send an email" do
        allow(subject).to receive(:whitelisted?).and_return(false)
        expect do
          subject.invite_to_event
        end.not_to change { ActionMailer::Base.deliveries.count }
      end
    end
  end

  describe "defaults" do
    let!(:default_status) { build_stubbed(:participant) }

    it 'status is defaulted to "invited"' do
      expect(default_status.status).to eq("invited")
    end
  end

  describe ".create" do
    it "sends an invitation email" do
      allow_any_instance_of(Participant).to receive(:whitelisted?).and_return(true)
      expect do
        create(:participant)
      end.to change { ActionMailer::Base.deliveries.count }
    end
  end
end
