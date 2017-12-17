# frozen_string_literal: true

class SessionsController < ApplicationController
  def index; end

  def create
    @user = User.find_or_create_from_auth(auth)
    session[:user_id] = @user.id
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

    def auth
      GoogleAuth.new(request.env["omniauth.auth"])
    end
end
