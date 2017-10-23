# frozen_string_literal: true

Types::EventType = GraphQL::ObjectType.define do
  name "Event"
  field :description, types.String
  field :id, !types.ID
  field :lat, types.Float
  field :lng, types.Float
  field :name, types.String
  field :numDays, types.Int
  field :participants, types[!Types::ParticipantType]
  field :start_date, types.String
end
