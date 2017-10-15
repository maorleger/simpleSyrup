# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { SecureRandom.hex(8) }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
  end

  factory :event do
    name { Faker::Company.bs }

    factory :event_with_participants do
      transient do
        participants_count 2
      end
    end

    after(:create) do |event, evaluator|
      create_list(:participant, evaluator.participants_count, event: event)
    end
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
