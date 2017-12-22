# frozen_string_literal: true

module Api
  module V1
    class ApplicationController < ActionController::API
      before_action :set_default_response_format
      before_action :authenticate

      rescue_from ActiveRecord::RecordNotFound do |e|
        render json: { message: e.message }, status: :not_found
      end

      private

        def authenticate
          render json: {}, status: :unauthorized unless user_signed_in?
        end

        def user_signed_in?
          !!current_user
        end

        def current_user
          @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
        end

        def set_default_response_format
          request.format = :json
        end
    end
  end
end
