# frozen_string_literal: true

FactoryBot.define do

  factory :user do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    photo_url "http://lorempixel.com/400/200/cats/"
  end

  factory :event do
    name { Faker::Company.bs }
  end

  factory :participant do
    association :user
    association :event
  end

  factory :google_auth do
    initialize_with { new(OmniAuth.config.mock_auth[:google]) }
    skip_create
  end
end
