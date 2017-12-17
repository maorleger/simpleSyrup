# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  controller(ApplicationController) do
    before_action :authenticate
    def index
      render json: {}
    end
  end

  describe "#authenticate" do
    describe "when a user is not signed in" do
      it "redirects to login page" do
        get :index
        expect(response).to redirect_to(sessions_path)
      end
    end

    describe "with a signed in user" do
      let(:user) { create(:user) }

      before(:each) do
        session[:user_id] = user.id
      end

      it "passes through" do
        get :index
        expect(response).to have_http_status(200)
      end

      describe "when the user doesnt exist in the system" do
        before(:each) do
          session[:user_id] = 9999
        end

        it "redirects to login page" do
          get :index
          expect(response).to redirect_to(sessions_path)
        end
      end
    end
  end
end
