# frozen_string_literal: true

class ParticipantsController < ApplicationController
  def create
    @participant = Participant.new(participant_params).tap do |p|
      p.save
    end
    render json: @participant, status: :created
  end

  private

    def participant_params
      params.permit(:event_id, :user_id, :status)
    end
end
