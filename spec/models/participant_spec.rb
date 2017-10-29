# frozen_string_literal: true

require "rails_helper"

RSpec.describe Participant, type: :model do
  specify { is_expected.to belong_to(:event) }

  it "belongs to user and is optional" do
    is_expected.to belong_to(:user)
    expect(build_stubbed(:participant, user: nil).valid?).to eq(true)
  end

  describe "#status" do
    specify do
      is_expected
        .to define_enum_for(:status)
        .with([:invited, :tentative, :accepted, :declined])
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
    let!(:accepted) { create(:participant, status: :accepted, event: event) }

    it "excludes declined users" do
      expect(event.participants.possible_participants).not_to include(declined)
    end

    it "sorts the participants by status" do
      expect(event.participants.possible_participants).to eq([accepted, tentative, invited])
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
