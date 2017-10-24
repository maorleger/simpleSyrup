
# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::EventType, type: :model do
  it "contains all the fields for event" do
    expect(SimpleSyrupSchema.types["Event"]).to contain_all_fields_for(Event)
  end
end
