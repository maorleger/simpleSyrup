# frozen_string_literal: true

require "rails_helper"

RSpec.describe SessionsController, type: :routing do
  describe "routing" do

    context "redirected routes" do
      include RSpec::Rails::RequestExampleGroup
      it "login redirects to google auth" do
        get "/login"
        expect(response).to redirect_to("/auth/google_oauth2")
      end

      it "failure redirects to root route" do
        get "/auth/failure"
        expect(response).to redirect_to("/")
      end
    end

    it "routes to #destroy" do
      expect(get: "/logout").to route_to("sessions#destroy")
    end

    it "callback routes to #create" do
      expect(get: "/auth/google/callback").to route_to("sessions#create", provider: "google")
    end
  end
end
