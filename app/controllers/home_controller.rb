# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :authenticate

  def show
    render file: "public/index.html"
  end
end
