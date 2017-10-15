# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :event do
    type Types::EventType
    argument :id, !types.ID
    description "Find an event by ID"
    resolve ->(obj, args, ctx) { Event.find(args["id"]) }
  end
end
