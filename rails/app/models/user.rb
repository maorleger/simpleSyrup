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
    def from_omniauth(omniauth_data)
      data = omniauth_data.info
      user = User.find_by(email: data["email"])

      create_user(data) unless user
      user
    end

    private

    def create_user(data)
      User.create!(
        email: data["email"],
        first_name: data["first_name"],
        last_name: data["last_name"],
        password: Devise.friendly_token[0, 20]
      )
    end
  end
end
