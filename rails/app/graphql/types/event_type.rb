# frozen_string_literal: true

Types::EventType = GraphQL::ObjectType.define do
  name "Event"
  field :id, types.ID
  field :name, types.String
  field :description, types.String
  field :num_days, types.Int
  field :lat, types.Float
  field :lng, types.Float
  field :start_date, types.String
  field :participants, types[!Types::ParticipantType]
end
