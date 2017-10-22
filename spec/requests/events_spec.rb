# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Events", type: :request do
  let!(:participant) { create(:participant) }
  describe "GET /events" do
    before do
      get events_path
    end

    def event
      JSON.load(response.body).first
    end

    it "returns the event details" do
      expect(response).to have_http_status(200)
      expect(event).to match(a_hash_including("name" => participant.event.name))
    end

    it "returns participants" do
      expect(event["participants"].first).to match(a_hash_including("status" => participant.status))
    end

    it "returns participant's user info" do
      expect(event["participants"].first["user"])
        .to match(a_hash_including("email" => participant.user.email))
    end
  end

  describe "GET /events/1" do
    before do
      get event_path(participant.event.id)
    end

    def event
      JSON.load(response.body)
    end

    it "returns the event details" do
      expect(response).to have_http_status(200)
      expect(event).to match(a_hash_including("name" => participant.event.name))
    end

    it "returns participants" do
      expect(event["participants"].first).to match(a_hash_including("status" => participant.status))
    end

    it "returns participant's user info" do
      expect(event["participants"].first["user"])
        .to match(a_hash_including("email" => participant.user.email))
    end
  end
end
