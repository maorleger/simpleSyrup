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
      end
    end
  end
end
