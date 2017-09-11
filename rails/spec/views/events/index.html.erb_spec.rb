# frozen_string_literal: true

require "rails_helper"

RSpec.describe "events/index", type: :view do
  before(:each) do
    assign(:events, [
             Event.create!(
               name: "Name",
               description: "Description",
               start_date: Time.zone.now + 2.days,
               num_days: 2
             ),
             Event.create!(
               name: "Name",
               description: "Description",
               start_date: Time.zone.now + 2.days,
               num_days: 2
             )
           ])
  end

  it "renders a list of events" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: "Description".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
  end
end
