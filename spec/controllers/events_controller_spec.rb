# frozen_string_literal: true

require "rails_helper"

RSpec.describe EventsController, type: :controller do
  let(:valid_session) { {} }

  describe "GET #show" do
    let(:event) { create(:event) }

    it "succeeds" do
      get :show, params: { id: event.to_param }, session: valid_session
      expect(response).to have_http_status(200)
    end
  end
end
