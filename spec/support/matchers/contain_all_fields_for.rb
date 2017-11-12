# frozen_string_literal: true

RSpec::Matchers.define :contain_all_fields_for do |expected|
  match do |actual|
    expected_keys = expected.attribute_names.map { |name| name.gsub("_id", "").camelize(:lower) }
    expect(actual.fields.keys).to include(*expected_keys)
  end
  failure_message do |actual|
    "Expected that the #{actual} graphQL object contain all the fields for #{expected}"
  end
end
