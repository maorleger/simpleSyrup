# frozen_string_literal: true

require "rails_helper"

RSpec.describe Api::V1::ApplicationController, type: :controller do
  let(:user) { create(:user) }
  controller(Api::V1::ApplicationController) do
    before_action :authenticate
    def index
      render json: {}
    end
  end

  describe "#authenticate" do
    describe "with a valid jwt token" do
      before(:each) do
        request.cookies["jwt"] = JsonWebToken.encode(user_id: user.id)
      end

      it "returns 200" do
        get :index
        expect(response).to have_http_status(200)
      end
    end

    describe "with an invalid jwt token" do
      describe "because the user id is invalid" do
        before(:each) do
          request.cookies["jwt"] = JsonWebToken.encode(user_id: 999)
        end

        it "returns 401" do
          expect(get :index).to have_http_status(401)
        end
      end

      describe "because the token expired" do
        before(:each) do
          request.cookies["jwt"] = JsonWebToken.encode(user_id: user.id, exp: 1.week.ago)
        end

        it "returns 401" do
          expect(get :index).to have_http_status(401)
        end
      end
    end
  end
end
