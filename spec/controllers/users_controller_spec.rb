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

  describe "POST #create" do
    describe "with a valid user" do
      let(:email) { Faker::Internet.email }
      let(:first_name) { Faker::Name.first_name }
      let(:last_name) { Faker::Name.last_name }
      let(:photo_url) { Faker::Internet.url }
      let(:user_params) {
        {
          email: email,
          first_name: first_name,
          last_name: last_name,
          photo_url: photo_url
        }
      }

      it "returns successful response" do
        post :create, params: { user: user_params }
        expect(response).to have_http_status(:created)
        expect(json["email"]).to eq(email)
        expect(json["first_name"]).to eq(first_name)
        expect(json["last_name"]).to eq(last_name)
        expect(json["photo_url"]).to eq(photo_url)
      end

      it "creates a user" do
        expect do
          post :create, params: { user: { email: "foo@bar.com" } }
        end.to change { User.count }.by(1)
      end
    end

    describe "with invalid attributes" do
      it "does not create the user" do
        expect do
          post :create, params: { user: { email: nil } }
        end.not_to change { User.count }
      end

      it "returns a 422" do
        post :create, params: { user: { email: nil } }
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "PUT #update" do
    let(:email) { Faker::Internet.email }
    let(:user) { create(:user) }

    describe "with valid attributes" do
      before do
        put :update, params: {
          id: user.to_param,
          user: {
            email: email
          }
        }
      end

      it "correctly updates the user" do
        expect(user.reload.email).to eq(email)
      end

      it "returns a successful response" do
        expect(response).to have_http_status(200)
      end
    end

    describe "with invalid attributes" do
      before do
        put :update, params: {
          id: user.to_param,
          user: {
            email: nil
          }
        }
      end

      it "does not update the user" do
        expect(user.reload.email).not_to eq(email)
      end

      it "returns a 422" do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:user) { create(:user) }

    it "destroys the requested user" do
      expect {
        delete :destroy, params: { id: user.to_param }
      }.to change(User, :count).by(-1)
    end
  end
end
