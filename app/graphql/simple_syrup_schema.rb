# frozen_string_literal: true

SimpleSyrupSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)
end
