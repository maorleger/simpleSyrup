# frozen_string_literal: true

Types::ParticipantType = GraphQL::ObjectType.define do
  name "Participant"
  field :id, !types.ID
  field :status, types.String

  field :user, Types::UserType
end
