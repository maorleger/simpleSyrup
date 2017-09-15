# frozen_string_literal: true

require "rails_helper"

RSpec.describe Participant, type: :model do
  describe "status" do
    it "Only accepts valid enumerations" do
      expect {
        create(:participant, status: :not_applicable)
      }.to raise_error(ArgumentError)

      expect {
        create(:participant, status: :accepted)
      }.not_to raise_error
    end
  end
end
