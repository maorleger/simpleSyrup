# frozen_string_literal: true

Types::EventType = GraphQL::ObjectType.define do
  name "Event"
  field :description, types.String
  field :id, !types.ID
  field :lat, types.Float
  field :lng, types.Float
  field :name, types.String
  field :num_days, types.Int
  field :start_date, types.String
  field :created_at, types.String
  field :updated_at, types.String
  field :participants, types[!Types::ParticipantType]
end
