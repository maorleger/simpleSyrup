# frozen_string_literal: true

module Oauth
  class Google
    def initialize(auth_hash)
      @auth_hash = auth_hash
    end

    def uid
      @auth_hash.uid
    end

    def provider
      @auth_hash.provider
    end

    def first_name
      @auth_hash.try(:info).try(:first_name)
    end

    def last_name
      @auth_hash.try(:info).try(:last_name)
    end

    def email
      @auth_hash.try(:info).try(:email)
    end

    def picture
      @auth_hash.try(:info).try(:image)
    end
  end
end
