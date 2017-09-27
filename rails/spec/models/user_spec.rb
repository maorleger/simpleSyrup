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
    let(:auth_hash) { OmniAuth.config.mock_auth[:google] }
    let(:google_oauth_provider) { Oauth::Google.new(auth_hash) }

    describe "when the user does not exist" do
      it "creates the user" do
        expect {
          User.find_or_create_from_auth_hash(google_oauth_provider)
        }.to change { User.count }.by(1)
      end

      it "correctly initializes the user" do
        created_user = User.find_or_create_from_auth_hash(google_oauth_provider)
        expect(created_user.provider).to eq(google_oauth_provider.provider)
        expect(created_user.uid).to eq(google_oauth_provider.uid)
        expect(created_user.first_name).to eq(google_oauth_provider.first_name)
        expect(created_user.last_name).to eq(google_oauth_provider.last_name)
        expect(created_user.email).to eq(google_oauth_provider.email)
        expect(created_user.picture).to eq(google_oauth_provider.picture)
      end
    end

    describe "when the user already exists" do
      let!(:existing_user) { User.find_or_create_from_auth_hash(google_oauth_provider) }

      it "returns the existing user" do
        expect(User.find_or_create_from_auth_hash(auth_hash).id). to eq(existing_user.id)
      end

      it "does not create another user" do
        expect {
          User.find_or_create_from_auth_hash(google_oauth_provider)
        }.not_to change { User.count }
      end
    end
  end
end
