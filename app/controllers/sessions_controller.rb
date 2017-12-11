# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_or_create_from_auth(auth)
    session[:user_id] = @user.id
    render json: {}
  end

  private

    def auth
      GoogleAuth.new(request.env["omniauth.auth"])
    end
end
