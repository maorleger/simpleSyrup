# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::ParticipantType, type: :model do
  it "contains all the fields for participant" do
    expect(SimpleSyrupSchema.types["Participant"]).to contain_all_fields_for(Participant)
  end
end
