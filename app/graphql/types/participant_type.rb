# frozen_string_literal: true

Types::ParticipantType = GraphQL::ObjectType.define do
  name "Participant"
  field :id, !types.ID
  field :status, types.String

  field :user, Types::UserType
  field :event, Types::EventType
  field :createdAt, types.String, property: :created_at
  field :updatedAt, types.String, property: :updated_at
end
