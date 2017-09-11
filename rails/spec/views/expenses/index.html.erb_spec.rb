# frozen_string_literal: true

require "rails_helper"

RSpec.describe "expenses/index", type: :view do
  before(:each) do
    assign(:expenses, [
             Expense.create!(
               amount: 2,
               user: nil
             ),
             Expense.create!(
               amount: 2,
               user: nil
             )
           ])
  end

  it "renders a list of expenses" do
    render
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
