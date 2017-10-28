# frozen_string_literal: true

json.extract!(
  user,
  :id,
  :first_name,
  :last_name,
  :email,
  :photo_url,
)

json.url user_url(user, format: :json)
