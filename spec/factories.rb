# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    name { SecureRandom.hex(8) }
  end
end
