# frozen_string_literal: true

class ParticipantsController < ApplicationController
  def create
    @participant = Participant.new(participant_params).tap do |p|
      p.save
    end
    # todo:
    # 1. figure out the location bit from event controller
    # 2. tests and implementation for bad case (event id is nil)
    render json: @participant, status: :created
    # Participant.create(participant_params)
  end

  private

    def participant_params
      params.permit(:event_id, :user_id)
    end
end
