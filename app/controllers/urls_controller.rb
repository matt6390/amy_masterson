class UrlsController < ApplicationController
	def index
		@urls = Url.all

		render json: @urls.as_json
	end

	def last
		@url = Url.last

		render json: @url.as_json
	end

	def create
		@url = Url.new(
						storage_url: params[:storage_url]
				       )
		if @url.save
			render json: @url.as_json
		else
	      render json: {errors: @url.errors.full_messages}, status: :unprocessable_entity
		end	
	end

	def destroy
		@url = Url.find(params[:id])
		@url.delete
		render json: {message: "URL removed from database"}
	end
end
