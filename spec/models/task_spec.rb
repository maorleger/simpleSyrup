# frozen_string_literal: true

require "rails_helper"

RSpec.describe Task, type: :model do
  let(:event) { create(:event) }

  it "user is optional" do
    expect {
      Task.create!(event: event, user: nil)
    }.not_to raise_error
  end
end
