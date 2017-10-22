# frozen_string_literal: true

Types::UserType = GraphQL::ObjectType.define do
  name "User"

  field :id, !types.ID
  field :first_name, types.String
  field :last_name, types.String
  field :email, types.String
  field :picture, types.String

end
