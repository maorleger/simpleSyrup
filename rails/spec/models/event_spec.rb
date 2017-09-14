# frozen_string_literal: true

require "rails_helper"

RSpec.describe Event, type: :model do

  describe "#start_date_cannot_be_in_the_past" do
    describe "does not set error when" do
      it "start date is blank" do
        event = build(:event, start_date: nil)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end

      it "start date is in the future" do
        event = build(:event, start_date: Date.today + 3.days)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end

      it "start date is today" do
        event = build(:event, start_date: Date.today)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end
    end

    it "sets validation error if start date is in the past" do
      event = build(:event, start_date: Date.today - 3.days)
      event.start_date_cannot_be_in_the_past
      expect(event.errors.messages[:start_date]).to eq(["can't be in the past"])
    end
  end

  #todo: end_date
end
