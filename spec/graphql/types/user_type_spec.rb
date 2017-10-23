# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::ParticipantType, type: :model do
  it "contains all the fields for participant" do
    participant_type = SimpleSyrupSchema.types["Participant"]
    expected_keys = Participant.attribute_names.map { |name| name.gsub("_id", "") }.sort
    expect(participant_type.fields.keys.sort).to eq(expected_keys)
  end
end
