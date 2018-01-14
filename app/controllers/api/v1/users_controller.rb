# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      before_action :set_user, only: [:show, :update, :destroy]
      before_action :authenticate

      def index
        @users = User.all
      end

      def show; end

      def create
        @user = User.new(user_params)
        if @user.save
          render :show, status: :created, location: api_v1_user_url(@user)
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def update
        if @user.update(user_params)
          render :show
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @user.destroy
      end

      private

        def user_params
          params.require(:user).permit(
            :email,
            :first_name,
            :last_name,
            :photo_url
          )
        end

        def set_user
          @user = User.find(params[:id])
        end
    end
  end
end
