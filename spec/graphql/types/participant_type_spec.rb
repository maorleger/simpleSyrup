# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::UserType, type: :model do
  it "contains all the fields inside user" do
    user_type = SimpleSyrupSchema.types["User"]
    expect(user_type.fields.keys.sort).to eq(User.attribute_names.sort)
  end
end
