# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::UserType, type: :model do
  it "contains all the fields inside user" do
    expect(SimpleSyrupSchema.types["User"]).to contain_all_fields_for(User)
  end
end
