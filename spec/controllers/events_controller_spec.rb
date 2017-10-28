# frozen_string_literal: true

require "rails_helper"

RSpec.describe EventsController, type: :controller do
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
        expect(response.location).to eq(event_url(Event.last))
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
        event = Event.create! valid_attributes
        put :update, params: { id: event.to_param, event: new_attributes }, session: valid_session
        event.reload
        expect(event.name).to eq(name)
        expect(event.description).to eq(description)
        expect(event.start_date).to eq(start_date)
      end

      it "renders a JSON response with the event" do
        event = Event.create! valid_attributes

        put :update, params: { id: event.to_param, event: valid_attributes }, session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json")
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
