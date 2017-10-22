# frozen_string_literal: true

require "rails_helper"

RSpec.describe DashboardController, type: :controller do

  describe "GET #index" do
    describe "without a signed in user" do
      it "GET #index requires sign in" do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    describe "with a signed in user" do
      let(:user) { create(:user) }
      before do
        sign_in user
      end

      it "returns http success" do
        get :index
        expect(response).to have_http_status(:success)
      end
    end
  end

end
