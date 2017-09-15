# frozen_string_literal: true

require "rails_helper"

RSpec.describe Expense, type: :model do
  let(:expense) { create(:expense) }
  describe "#delegates" do
    it "delegates user to participant" do
      expect(expense.user).to eq(expense.participant.user)
    end

    it "delegates event to participant" do
      expect(expense.event).to eq(expense.participant.event)
    end
  end
end
