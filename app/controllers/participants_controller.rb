# frozen_string_literal: true

class ParticipantsController < ApplicationController
  def create
    status = :conflict

    @participant = Participant.find_or_create_by!(participant_params.except(:status)) do |participant|
      participant.status = participant_params[:status]
      status = :created
    end

    render json: @participant, status: status
  end

  private

    def participant_params
      params.permit(:event_id, :user_id, :status)
    end
end
