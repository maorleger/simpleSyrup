class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable,
         omniauth_providers: [:google_oauth2]

  has_many :participants
  has_many :events, through: :participants

  def self.from_omniauth(omniauth_data)
    data = omniauth_data.info
    user = User.find_by_email(data['email'])

    puts data.inspect
    unless user
      user = User.create!(
        email: data['email'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        password: Devise.friendly_token[0,20],
      )
    end
    user
  end
end
