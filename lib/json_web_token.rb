# frozen_string_literal: true

class JsonWebToken
  def self.encode(payload)
    payload[:exp] ||= 1.week.from_now
    payload[:exp] = payload[:exp].to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    return HashWithIndifferentAccess.new(
      JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    )
  rescue
    nil
  end
end
