# frozen_string_literal: true

module Api
  module V1
    class ApplicationController < ActionController::API
      before_action :set_default_response_format

      rescue_from ActiveRecord::RecordNotFound do |e|
        render json: { message: e.message }, status: :not_found
      end

      private

        def set_default_response_format
          request.format = :json
        end
    end
  end
end
