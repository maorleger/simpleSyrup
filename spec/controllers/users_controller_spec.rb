# frozen_string_literal: true

require "rails_helper"

RSpec.describe UsersController, type: :controller do
  render_views
  let!(:users) { create_list(:user, 4) }
  let(:json) { JSON.parse(response.body) }

  describe "GET #index" do
    it "returns all users as json" do
      get :index
      expect(response).to have_http_status(:success)
      expect(json.map { |j| j["firstName"] }).to eq(users.map(&:first_name))
    end
  end

  describe "GET #show" do
    describe "with a valid user" do
      let(:user) { users.first }
      it "returns the user as json" do
        get :show, params: { id: user.to_param }
        expect(response).to have_http_status(:success)
        expect(json["firstName"]).to eq(user.first_name)
        expect(json["lastName"]).to eq(user.last_name)
        expect(json["email"]).to eq(user.email)
        expect(json["id"]).to eq(user.id)
      end
    end
  end
end
