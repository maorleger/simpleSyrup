# frozen_string_literal: true

require "rails_helper"

RSpec.describe Oauth::Google do
  it "accepts a hash" do
    expect {
      Oauth::Google.new({})
    }.not_to raise_error
  end
  let(:oauth_hash) { OmniAuth.config.mock_auth[:google] }

  subject do
    Oauth::Google.new(oauth_hash)
  end

  [:provider,
   :uid,
  ].each do |attr|
    it "defines top level #{attr}" do
      expect(subject.send(attr)).to eq(oauth_hash.send(attr))
    end
  end

  [:first_name,
   :last_name,
   :email,
  ].each do |attr|
    it "defines nested #{attr}" do
      expect(subject.send(attr)).to eq(oauth_hash.info.send(attr))
    end
  end

  it "can map picture to image" do
    expect(subject.picture).to eq(oauth_hash.info.image)
  end
end
