# frozen_string_literal: true

class GoogleAuth
  def initialize(auth_hash)
    @auth_hash = auth_hash
    @info_hash = auth_hash.info
  end

  delegate :provider, :uid, to: :auth_hash
  delegate :first_name, :last_name, :email, to: :info_hash

  def to_h
    {
      email: email,
      first_name: first_name,
      last_name: last_name,
      photo_url: photo_url,
      provider: provider,
      uid: uid,
    }
  end

  def photo_url
    info_hash.image
  end

  private

    attr_reader :auth_hash, :info_hash
end
