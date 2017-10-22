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
end
