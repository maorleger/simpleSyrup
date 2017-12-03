# frozen_string_literal: true

require "rails_helper"

RSpec.describe HomeController, type: :controller do
  let(:valid_session) { {} }

  describe "GET #show" do
    let(:subject) { get :show }
    let(:event) { create(:event) }

    it "succeeds" do
      expect(subject).to have_http_status(200)
    end

    it "renders the public index file" do
      expect(subject).to render_template(file: "index.html")
    end
  end
end
