# frozen_string_literal: true

binding.pry
json.array! @events, partial: "events/event", as: :event
