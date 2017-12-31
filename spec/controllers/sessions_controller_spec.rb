# frozen_string_literal: true

require "rails_helper"

RSpec.describe SessionsController, type: :controller do
  let(:auth_hash) { OmniAuth.config.mock_auth[:google] }
  let(:auth) { GoogleAuth.new(auth_hash) }

  before(:each) do
    request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:google]
  end

  describe "/auth/:provider/callback" do
    let!(:user) { create(:user, uid: auth.uid, provider: auth.provider) }

    def do_request
      get "create", params: { "provider" => "google" }
    end

    it "calls the upsert function on a user" do
      expect(User).to receive(:find_or_create_from_auth) do |received_auth|
        expect(received_auth.uid).to eq(auth.uid)
        expect(received_auth.provider).to eq(auth.provider)
        user
      end
      do_request
    end

    it "assigns a user" do
      do_request
      expect(assigns[:user]).to eq(user)
    end

    it "sets the user_id in the session" do
      do_request
      expect(session[:user_id]).to eq(user.id)
    end

    it "sets a jwt token as a cookie" do
      do_request
      expect(cookies[:jwt]).not_to be_nil
    end

    it "redirects to home#index" do
      do_request
      expect(response).to redirect_to(root_path)
    end

    it "expires the session" do
      session[:old_user_id] = 123
      do_request
      expect(session[:old_user_id]).to be_nil
    end
  end

  describe "#logout" do
    let(:user) { create(:user) }
    before(:each) do
      session[:user_id] = user.id
    end

    it "clears out the user_id" do
      get :destroy
      expect(session[:user_id]).to be_nil
    end

    it "redirects to the root path" do
      get :destroy
      expect(response).to redirect_to(sessions_path)
    end
  end

  describe "#index" do
    it "has a route" do
      get :index
      expect(response).to have_http_status(200)
    end
  end
end
