# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  specify { is_expected.to have_many(:participants).dependent(:destroy) }
  specify { is_expected.to validate_presence_of(:email) }


  describe ".find_or_create_from_auth" do
    context "for google auth" do
      let(:auth) { create(:google_auth) }

      context "when no user exists" do
        it "creates the user" do
          expect do
            User.find_or_create_from_auth(auth)
          end.to change { User.count }.by(1)
        end

        it "assigns the correct attributes to the user" do
          User.find_or_create_from_auth(auth)
          created_user = User.last

          expect(created_user.email).to eq(auth.email)
          expect(created_user.first_name).to eq(auth.first_name)
          expect(created_user.last_name).to eq(auth.last_name)
          expect(created_user.photo_url).to eq(auth.photo_url)
          expect(created_user.provider).to eq(auth.provider)
          expect(created_user.uid).to eq(auth.uid)
        end

        it "returns a user" do
          expect(User.find_or_create_from_auth(auth)).to be_a(User)
        end
      end

      context "when a user already exists" do
        let!(:user) do
          create(
            :user,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.email,
            provider: auth.provider,
            uid: auth.uid,
          )
        end

        it "does not create the user" do
          expect do
            User.find_or_create_from_auth(auth)
          end.not_to change { User.count }
        end

        it "updates the user attributes" do
          User.find_or_create_from_auth(auth)
          expect(user.reload.email).to eq(auth.email)
          expect(user.first_name).to eq(auth.first_name)
          expect(user.last_name).to eq(auth.last_name)
          expect(user.photo_url).to eq(auth.photo_url)
        end

        it "returns a user" do
          expect(User.find_or_create_from_auth(auth)).to be_a(User)
        end
      end
    end
  end
end
