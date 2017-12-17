# frozen_string_literal: true

require "rails_helper"

RSpec.describe HomeController, type: :controller do
  describe "GET #show" do
    let(:subject) { get :show }
    let(:event) { create(:event) }

    describe "when a user is not logged in" do
      it "redirects to login path" do
        expect(subject).to redirect_to(sessions_path)
      end
    end

    describe "with a logged in user" do
      let(:user) { create(:user) }

      before(:each) do
        session[:user_id] = user.id
      end

      it "succeeds" do
        expect(subject).to have_http_status(200)
      end

      it "renders the public index file" do
        expect(subject).to render_template(file: "index.html")
      end
    end
  end
end
