# frozen_string_literal: true

require "rails_helper"

RSpec.describe "events/edit", type: :view do
  before(:each) do
    @event = assign(:event, Event.create!(
                              name: "MyString",
                              description: "MyString",
                              start_date: Time.zone.now + 2.days,
                              num_days: 1
    ))
  end

  it "renders the edit event form" do
    render

    assert_select "form[action=?][method=?]", event_path(@event), "post" do
      assert_select "input[name=?]", "event[name]"

      assert_select "input[name=?]", "event[description]"

      assert_select "input[name=?]", "event[num_days]"
    end
  end
end
