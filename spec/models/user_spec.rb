# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  specify { is_expected.to have_many(:participants).dependent(:destroy) }
  specify { is_expected.to validate_presence_of(:email) }
end
