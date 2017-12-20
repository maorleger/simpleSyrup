# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::EventsController, type: :controller do
  render_views

  let(:valid_attributes) {
    {
      name: Faker::Zelda.location,
    }
  }

  let(:invalid_attributes) {
    {
      start_date: Date.today - 3.days,
      name: nil,
    }
  }

  let(:valid_session) { {} }
  let!(:event) { create(:event) }

  let(:json) { JSON.parse(response.body) }

  describe "GET #index" do
    it "returns a success response" do
      get :index, params: {}, session: valid_session
      expect(response).to be_success
      expect(json.map { |j| j["id"] }).to eq([event.id])
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: event.to_param }, session: valid_session
      expect(response).to be_success
      expect(json["id"]).to eq(event.id)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Event" do
        expect {
          post :create, params: { event: valid_attributes }, session: valid_session
        }.to change(Event, :count).by(1)
      end

      it "renders a JSON response with the new event" do

        post :create, params: { event: valid_attributes }, session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq("application/json")
        expect(response.location).to eq(api_v1_event_url(Event.last))
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new event" do

        post :create, params: { event: invalid_attributes }, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:event) { create(:event) }
      let(:name) { Faker::HarryPotter.book }
      let(:description) { Faker::HarryPotter.quote }
      let(:start_date) { Date.today + 5.months }
      let(:new_attributes) do
        {
          name: name,
          description: description,
          start_date: start_date,
        }
      end

      it "updates the requested event" do
        put :update, params: { id: event.to_param, event: new_attributes }, session: valid_session
        event.reload
        expect(event.name).to eq(name)
        expect(event.description).to eq(description)
        expect(event.start_date).to eq(start_date)
      end

      it "renders a JSON response with the event" do
        put :update, params: { id: event.to_param, event: new_attributes }, session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json")
        expect(json["description"]).to eq(description)
      end

      describe "with participants" do
        let(:users) { create_list(:user, 3) }
        let(:users_param) { users.map { |user| { user_id: user.id, status: "attending" } } }

        it "can add a single participant" do
          expect do
            put :update, params: {
              id: event.to_param,
              event: {
                participants_attributes: [
                  { user_id: users.first.id }
                ]
              }
            }
          end.to change { Participant.count }.by(1)
        end

        describe "when the user is not found" do
          it "returns a 404" do
            put :update, params: {
              id: event.to_param,
              event: {
                participants_attributes: [
                  { user_id: 123456 }
                ]
              }
            }
            expect(response).to have_http_status(404)
          end
        end

        it "returns the new participant data" do
          put :update, params: { id: event.to_param, event: { participants_attributes: users_param } }
          expect(json["participants"].map { |p| p["userId"] }.sort).to eq(users_param.map { |up| up[:user_id] })
        end

        it "can accept multiple particpants" do
          expect do
            put :update, params: { id: event.to_param, event: { participants_attributes: users_param } }
          end.to change { Participant.count }.by(users.count)
        end

        it "correctly updates the status" do
          put :update, params: { id: event.to_param, event: { participants_attributes: users_param } }
          expect(event.participants.pluck(:status)).to eq(users.map { "attending" })
        end

        it "can handle skipped status" do
          no_status_params = users_param.map { |user_hash| user_hash.except(:status) }
          put :update, params: { id: event.to_param, event: { participants_attributes: no_status_params } }
          expect(event.participants.pluck(:status)).to eq(users.map { "invited" })
        end

        describe "when a participant already exists" do
          let!(:participant) do
            create(:participant,
                   event: event,
                   user: users.first
                  )
          end

          it "does not create a new participant" do
            expect do
              put :update, params: {
                id: event.to_param,
                event: {
                  participants_attributes: [
                    {
                      id: participant.id,
                      user_id: users.first.id,
                      status: "declined"
                    }
                  ]
                }
              }
            end.not_to change { Participant.count }
            expect(participant.reload.status).to eq("declined")
          end

          it "allows deleting the participant" do
            expect do
              put :update, params: {
                id: event.to_param,
                event: {
                  participants_attributes: [{ id: participant.id, _destroy: true }]
                }
              }
            end.to change { Participant.count }.by(-1)
          end

          context "when the participant id doesnt exist" do
            it "returns a 404" do
              put :update, params: {
                id: event.to_param,
                event: {
                  participants_attributes: [{ id: 123455 }]
                }
              }
              expect(response).to have_http_status(404)
            end
          end
        end
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the event" do
        event = Event.create! valid_attributes

        put :update, params: { id: event.to_param, event: invalid_attributes }, session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested event" do
      event = Event.create! valid_attributes
      expect {
        delete :destroy, params: { id: event.to_param }, session: valid_session
      }.to change(Event, :count).by(-1)
    end
  end

end
