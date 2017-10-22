# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:google_oauth2]
  acts_as_token_authenticatable

  has_many :participants
  has_many :events, through: :participants

  class << self
    def find_or_create_from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
        user.attributes = auth.to_h
        user.password = Devise.friendly_token[0, 20]
      end
    end
  end
end