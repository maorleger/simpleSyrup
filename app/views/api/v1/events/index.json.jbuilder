# frozen_string_literal: true

json.array! @events, partial: "api/v1/events/event", as: :event
