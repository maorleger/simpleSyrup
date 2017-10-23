
# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::EventType, type: :model do
  it "contains all the fields for event" do
    event_type = SimpleSyrupSchema.types["Event"]
    expected_keys = Event.attribute_names.map { |name| name.gsub("_id", "") }.sort
    # it should be a superset of an event
    expect(event_type.fields.keys.sort).to include(*expected_keys)
  end
end
