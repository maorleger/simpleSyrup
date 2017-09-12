# frozen_string_literal: true

require "rails_helper"
require "ostruct"

RSpec.describe User, type: :model do
  it "requires a password" do
    expect {
      User.create!(
        first_name: "George",
        last_name: "Constanza"
      )
    }.to raise_error(ActiveRecord::RecordInvalid)
  end

  describe "from_omniauth" do
    let(:omniauth_data) { OpenStruct.new(info: { "email" => Faker::Internet.email }) }

    it "Creates a user if none exist" do
      user = User.from_omniauth(omniauth_data)
      expect(user).to eq(User.last)
    end

    it "Returns an existing user if one exists" do
      email = omniauth_data.info["email"]
      created_user = User.create!(
        email: email,
        password: SecureRandom.hex(8)
      )
      user = User.from_omniauth(omniauth_data)
      expect(user).to eq(created_user)
    end
  end
end
