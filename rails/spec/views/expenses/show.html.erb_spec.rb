# frozen_string_literal: true

require "rails_helper"

RSpec.describe "expenses/show", type: :view do
  before(:each) do
    # @expense = assign(:expense, Expense.create!(
    #   amount: 2,
    #   participant: nil
    # ))
  end

  it "renders attributes in <p>" do
    skip "needs to be fixed"
    render
    expect(rendered).to match(/2/)
    expect(rendered).to match(//)
  end
end
