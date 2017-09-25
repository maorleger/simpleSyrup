# frozen_string_literal: true

require "rails_helper"

RSpec.describe Event, type: :model do
  describe "#start_date_cannot_be_in_the_past" do
    describe "does not set error when" do
      it "start date is blank" do
        event = build(:event)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end

      it "start date is in the future" do
        event = build(:event, start_date: Time.zone.today + 3.days)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end

      it "start date is today" do
        event = build(:event, start_date: Time.zone.today)
        event.start_date_cannot_be_in_the_past
        expect(event.errors.messages.size).to eq(0)
      end
    end

    it "sets validation error if start date is in the past" do
      event = build(:event, start_date: Time.zone.today - 3.days)
      event.start_date_cannot_be_in_the_past
      expect(event.errors.messages[:start_date]).to eq(["can't be in the past"])
    end
  end

  describe "defaults" do
    it "defaults num_days to 1" do
    end
  end

  describe "num_days" do
    let(:event) { create(:event) }
    it "defaults to 1" do
      expect(event.num_days).to eq(1)
    end

    it "must be numerical" do
      event.num_days = "foo"
      expect { event.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "must be set" do
      event.num_days = nil
      expect { event.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "must be positve" do
      [-100, -1, 0].each do |i|
        event.num_days = i
        expect { event.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    it "accepts positive numbers" do
      [1, 10, 40].each do |i|
        event.num_days = i
        expect { event.save! }.not_to raise_error
      end
    end
  end

  describe "#end_date" do
    let(:event) { create(:event) }

    it "returns nil if start_date is nil" do
      expect(event.end_date).to be_nil
    end

    it "correctly calculates for multi-day trips" do
      event.update(start_date: Time.zone.today, num_days: 3)
      expect(event.end_date).to eq(Time.zone.today + 2.days)
    end

    it "correctly calculates for single-day events" do
      event.update(start_date: Time.zone.today, num_days: 1)
      expect(event.end_date).to eq(Time.zone.today)
    end
  end
end
