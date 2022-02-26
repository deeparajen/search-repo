
class Api::V1::RepositoryController < ApplicationController
  def search
    repositories = RepositoryServices.new(
      text: params[:search],
      page: params[:page]
    ).call
    render json: { data: repositories }, status: 200
  end
end
