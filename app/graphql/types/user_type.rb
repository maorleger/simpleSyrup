# frozen_string_literal: true

Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :first_name, types.String
  field :last_name, types.String
  field :email, types.String
  field :photo_url, types.String
  field :created_at, types.String
  field :updated_at, types.String
end
