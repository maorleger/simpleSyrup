# frozen_string_literal: true

class EventsController < ApplicationController
  def index
    render file: "public/index.html"
  end

  def show
    @event = Event.find(params[:id])
  end
end
