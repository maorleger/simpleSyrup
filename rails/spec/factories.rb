# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { SecureRandom.hex(8) }
  end

  factory :event do
    name { Faker::Company.bs }
    description { Faker::Seinfeld.quote }
    start_date { Faker::Date.forward(23) }
    num_days { Faker::Number.number(1).to_i + 1 }
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
  end

  factory :participant do
    association :user, factory: :user
    association :event, factory: :event
    status { Participant.statuses.values.sample }
  end
end
