# frozen_string_literal: true

require "rails_helper"

RSpec.describe ParticipantsController, type: :controller do
  let(:event) { create(:event) }
  let(:user) { create(:user) }

  describe "POST #create" do
    let(:post_params) do
      {
        event_id: event.id,
        user_id: user.id,
        status: "invited"
      }
    end

    describe "when the participant is valid" do
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

      it "sends an email invitation" do
        expect_any_instance_of(Participant).to receive(:invite_to_event)
        post :create, params: post_params
      end
    end

    describe "when the participant is invalid" do
      it "because it has no event id" do
        expect do
          post :create, params: post_params.except(:event_id)
        end.to raise_error(ActionController::UrlGenerationError)
      end

      it "because it has in invalid status" do
        expect do
          post :create, params: post_params.merge(status: "foobar")
        end.to raise_error(ArgumentError)
      end

      describe "because it already exists" do
        let!(:participant) {
          create(
            :participant,
            user_id: post_params[:user_id],
            event_id: post_params[:event_id]
          )
        }

        it "returns http status 409" do
          expect_any_instance_of(Participant).not_to receive(:invite_to_event)

          post :create, params: post_params

          expect(response).to have_http_status(:conflict)
          expect(response.body).to eq(participant.to_json)
        end

        it "still sends an email if the email param is true" do
          expect_any_instance_of(Participant).to receive(:invite_to_event)

          post :create, params: post_params.merge(email: true)
        end
      end

    end
  end
end
