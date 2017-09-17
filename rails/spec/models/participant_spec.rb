# frozen_string_literal: true

require "rails_helper"

RSpec.describe Participant, type: :model do
  describe "status" do
    it "Only accepts valid enumerations" do
      expect {
        create(:participant, status: :not_applicable)
      }.to raise_error(ArgumentError)

      expect {
        create(:participant, status: :accepted)
      }.not_to raise_error
    end
  end

  describe "event_participants" do
    let!(:event) { create(:event) }

    let!(:declined) { create(:participant, status: :declined, event: event) }
    let!(:invited) { create(:participant, status: :invited, event: event) }
    let!(:tentative) { create(:participant, status: :tentative, event: event) }
    let!(:accepted) { create(:participant, status: :accepted, event: event) }

    it "excludes declined users" do
      expect(event.participants.possible_participants).not_to include(declined)
    end

    it "sorts the participants by status" do
      expect(event.participants.possible_participants).to eq([invited, tentative, accepted])
    end
  end
end
