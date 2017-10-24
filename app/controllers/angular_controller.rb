# frozen_string_literal: true

class AngularController < ApplicationController
  before_action :set_default_response_format

  def index
  end

  private

    def set_default_response_format
      request.format = :json
    end
end
