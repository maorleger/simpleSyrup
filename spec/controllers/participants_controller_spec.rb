# frozen_string_literal: true

require "rails_helper"

RSpec.describe ParticipantsController, type: :controller do
  let(:event) { create(:event) }
  let(:user) { create(:user) }
  describe "POST #create" do
    let(:post_params) do
      {
        event_id: event.id,
        user_id: user.id
      }
    end

    it "returns http success" do
      post :create, params: post_params
      expect(response).to have_http_status(:success)
    end

    it "creates a new participant" do
      expect {
        post :create, params: post_params
      }.to change { Participant.count }.by(1)

      participant = Participant.last
      expect(participant.event).to eq(event)
      expect(participant.user).to eq(user)
      expect(response.body).to eq(participant.to_json)
    end
  end
end
