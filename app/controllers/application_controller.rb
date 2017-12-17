# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate
    redirect_to sessions_path unless user_signed_in?
  end

  private

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue ActiveRecord::RecordNotFound
    end

    def user_signed_in?
      !!current_user
    end
end
