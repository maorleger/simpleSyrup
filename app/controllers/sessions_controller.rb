# frozen_string_literal: true

require "json_web_token"

class SessionsController < ApplicationController
  def index; end

  def create
    @user = User.find_or_create_from_auth(auth)
    reset_session
    session[:user_id] = @user.id
    cookies[:jwt] = JsonWebToken.encode(user_id: @user.id)
    redirect_to root_path
  end

  def destroy
    @current_user = nil
    session[:user_id] = nil
    reset_session
    redirect_to sessions_path
  end

  private

    def auth
      GoogleAuth.new(request.env["omniauth.auth"])
    end
end
