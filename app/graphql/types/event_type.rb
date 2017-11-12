# frozen_string_literal: true

Types::EventType = GraphQL::ObjectType.define do
  name "Event"
  field :description, types.String
  field :id, !types.ID
  field :lat, types.Float
  field :lng, types.Float
  field :name, types.String
  field :numDays, types.Int, property: :num_days
  field :startDate, types.String, property: :start_date
  field :createdAt, types.String, property: :created_at
  field :updatedAt, types.String, property: :updated_at
  field :participants, types[!Types::ParticipantType]
end
