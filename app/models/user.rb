# frozen_string_literal: true

class User < ApplicationRecord
  has_many :participants, dependent: :destroy
  validates_presence_of :email
end
