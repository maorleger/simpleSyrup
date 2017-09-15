# frozen_string_literal: true

require "rails_helper"

RSpec.describe EventsController, type: :controller do
  let(:valid_attributes) do
    {
      name: Faker::Zelda.location,
    }
  end

  let(:invalid_attributes) do
    {
      start_date: Date.today - 3.days,
      name: nil,
    }
  end

  let(:valid_session) { {} }

  describe "GET #index" do
    it "returns a success response" do
      Event.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      event = Event.create! valid_attributes
      get :show, params: { id: event.to_param }, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #new" do
    it "returns a success response" do
      get :new, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe "GET #edit" do
    it "returns a success response" do
      event = Event.create! valid_attributes
      get :edit, params: { id: event.to_param }, session: valid_session
      expect(response).to be_success
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Event" do
        expect do
          post :create, params: { event: valid_attributes }, session: valid_session
        end.to change(Event, :count).by(1)
      end

      it "redirects to the created event" do
        post :create, params: { event: valid_attributes }, session: valid_session
        expect(response).to redirect_to(Event.last)
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: { event: invalid_attributes }, session: valid_session
        expect(response).to be_success
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

      it "redirects to the event" do
        event = Event.create! valid_attributes
        put :update, params: { id: event.to_param, event: valid_attributes }, session: valid_session
        expect(response).to redirect_to(event)
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'edit' template)" do
        event = Event.create! valid_attributes
        put :update, params: { id: event.to_param, event: invalid_attributes }, session: valid_session
        expect(response).to be_success
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested event" do
      event = Event.create! valid_attributes
      expect do
        delete :destroy, params: { id: event.to_param }, session: valid_session
      end.to change(Event, :count).by(-1)
    end

    it "redirects to the events list" do
      event = Event.create! valid_attributes
      delete :destroy, params: { id: event.to_param }, session: valid_session
      expect(response).to redirect_to(events_url)
    end
  end
end
