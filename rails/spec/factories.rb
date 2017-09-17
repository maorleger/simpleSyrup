# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { SecureRandom.hex(8) }
  end

  factory :event do
    name { Faker::Company.bs }
  end

  factory :participant do
    association :user, factory: :user
    association :event, factory: :event
  end

  factory :expense do
    participant
    amount { Faker::Number.decimal(2) }
  end
end
