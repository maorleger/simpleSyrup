# frozen_string_literal: true

require "rails_helper"

RSpec.describe GraphqlController, type: :controller do

  let(:user) { create(:user, authentication_token: SecureRandom.hex(8)) }
  let(:auth_params) { { user_email: user.email, user_token: user.authentication_token } }
  let(:event) do
    create(
      :event_with_participants,
      description: Faker::Zelda.location
    )
  end

  describe "API Authentication" do
    it "with a valid token successfully authenticates" do
      post :execute, params: auth_params, format: :json
      expect(response).to be_success
    end

    it "with an invalid token does not authenticate" do
      post :execute, params: { user_email: user.email, user_token: SecureRandom.hex(8) }, format: :json
      expect(response.status).to eq(401)
      expect(JSON.load(response.body)).to eq("error" => "You need to sign in or sign up before continuing.")
    end
  end

  describe "Event requests" do
    it "works" do
      query = <<~EOF
      {
        event(id: #{event.id}) {
          id,
          name,
          description,
          lat,
          lng,
          participants {
            id,
            status,
            user {
              first_name
            }
          }
        }
      }
      EOF

      expected_response = {
        "data" => {
          "event" => {
            "id" => event.id.to_s,
            "name" => event.name,
            "description" => event.description,
            "lat" => event.lat,
            "lng" => event.lng,
            "participants" => Participant.all.map do |p|
              {
                "id" => p.id.to_s,
                "status" => p.status,
                "user" => {
                  "first_name" => p.user.first_name
                }
              }
            end
          }
        }
      }
      request_params = { "query" => query }
      post :execute, params: auth_params.merge(request_params)
      expect(response).to be_success
      binding.pry
      expect(JSON.load(response.body)).to eq(expected_response)
      puts JSON.load(response.body)

    end
  end
end
