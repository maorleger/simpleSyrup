# frozen_string_literal: true

class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]

  def index
    @events = Event.all
  end

  def show; end

  # POST /events
  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      render :show
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    @event.destroy
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(
        :name,
        :description,
        :start_date,
        :num_days,
        :lat,
        :lng,
        participants_attributes: [:id, :user_id, :status, :_destroy]
      )
    end
end
