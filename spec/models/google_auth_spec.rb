# frozen_string_literal: true

require "rails_helper"

RSpec.describe GoogleAuth do
  AUTH_HASH_FIELDS = {
    provider: "google",
    uid: "12345",
    first_name: "Test",
    last_name: "User",
    email: "test_user@example.com",
    photo_url: "http://avatar.example.com",
  }

  let(:auth_hash) { OmniAuth.config.mock_auth[:google] }

  subject { GoogleAuth.new(auth_hash) }

  describe "expected fields" do
    AUTH_HASH_FIELDS.each do |field, value|
      it "returns #{field}" do
        expect(subject.public_send(field)).to eq(value)
      end
    end
  end

  describe "#to_h" do
    it "contains the expected fields" do
      expect(subject.to_h).to eq(AUTH_HASH_FIELDS)
    end
  end
end
