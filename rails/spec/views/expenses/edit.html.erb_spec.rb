# frozen_string_literal: true

require "rails_helper"

RSpec.describe "expenses/edit", type: :view do
  before(:each) do
    # @expense = assign(:expense, Expense.create!(
    #   amount: 1,
    #   participant: nil
    # ))
  end

  it "renders the edit expense form" do
    skip "needs to be fixed"
    render

    assert_select "form[action=?][method=?]", expense_path(@expense), "post" do
      assert_select "input[name=?]", "expense[amount]"

      assert_select "input[name=?]", "expense[user_id]"
    end
  end
end
