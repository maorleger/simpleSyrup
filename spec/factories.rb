# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
  end

  factory :event do
    name { Faker::Company.bs }
  end

  factory :participant do
    association :user
    association :event
  end
end
