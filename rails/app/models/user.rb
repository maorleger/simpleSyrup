# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:google_oauth2]

  has_many :participants
  has_many :events, through: :participants

  class << self
    def find_or_create_from_auth_hash(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create! do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.first_name = auth.info.first_name
        user.last_name = auth.info.last_name
        user.email = auth.info.email
        user.picture = auth.info.image
        user.password = Devise.friendly_token[0, 20]
      end
    end
  end
end
