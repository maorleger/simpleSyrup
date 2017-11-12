# frozen_string_literal: true

Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :firstName, types.String, property: :first_name
  field :lastName, types.String, property: :last_name
  field :email, types.String
  field :photoUrl, types.String, property: :photo_url
  field :createdAt, types.String, property: :created_at
  field :updatedAt, types.String, property: :updated_at
end
