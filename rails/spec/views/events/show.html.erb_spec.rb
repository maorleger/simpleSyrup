# frozen_string_literal: true

require "rails_helper"

RSpec.describe "events/show", type: :view do
  before(:each) do
    @event = assign(:event, Event.create!(
                              name: "Name",
                              description: "Description",
                              start_date: Time.zone.now + 2.days,
                              num_days: 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Description/)
    expect(rendered).to match(/2/)
  end
end
