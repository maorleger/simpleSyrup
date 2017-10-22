# frozen_string_literal: true

require "rails_helper"

RSpec.describe Event, type: :model do
  describe "validations" do
    specify do
      is_expected
        .to validate_numericality_of(:num_days)
        .is_greater_than(0)
    end

    specify do
      is_expected
        .to validate_presence_of(:name)
    end

    describe "#start_date_cannot_be_in_the_past" do
      describe "does not set error when" do
        it "start date is blank" do
          event = build_stubbed(:event)
          expect(event.valid?).to eq(true)
          expect(event.errors.messages.size).to eq(0)
        end

        it "start date is in the future" do
          event = build_stubbed(:event, start_date: Time.zone.today + 3.days)
          expect(event.valid?).to eq(true)
          expect(event.errors.messages.size).to eq(0)
        end

        it "start date is today" do
          event = build_stubbed(:event, start_date: Time.zone.today)
          expect(event.valid?).to eq(true)
          expect(event.errors.messages.size).to eq(0)
        end
      end

      it "sets validation error if start date is in the past" do
        event = build_stubbed(:event, start_date: Time.zone.today - 3.days)
        expect(event.valid?).to eq(false)
        expect(event.errors.messages[:start_date]).to eq(["can't be in the past"])
      end
    end
  end

  describe "defaults" do
    it "Defaults num_days to 1" do
      expect(build_stubbed(:event).num_days).to eq(1)
    end
  end

  describe "#end_date" do
    let(:event) { build_stubbed(:event) }

    it "returns nil if start_date is nil" do
      expect(event.end_date).to be_nil
    end

    it "correctly calculates single-day events" do
      event.start_date = Time.zone.today
      expect(event.end_date).to eq(Time.zone.today)
    end

    it "correctly calculates multi-day events" do
      event.start_date = Time.zone.today
      event.num_days = 3
      expect(event.end_date).to eq(Time.zone.today + 2.days)
    end
  end
end
