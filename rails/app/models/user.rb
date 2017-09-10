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
    # todo: getting password cant be blank here. I need to somehow suppress it

    puts data.inspect
    unless user
      user = User.create!(
        first_name: data['given_name'],
        last_name: data['family_name'],
        email: data['email'],
      )
    end
    user
  end
end
