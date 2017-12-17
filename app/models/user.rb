# frozen_string_literal: true

class User < ApplicationRecord
  has_many :participants, dependent: :destroy
  validates_presence_of :email

  class << self
    def find_or_create_from_auth(auth)
      user = where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
        user.attributes = auth.to_h
        user.save!
      end
    end
  end
end
