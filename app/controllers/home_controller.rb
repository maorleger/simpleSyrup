# frozen_string_literal: true

class HomeController < ApplicationController
  def show
    render file: "public/index.html"
  end
end
