class MosaicsController < ApplicationController
  def index
    @mosaics = Mosaic.all

    render 'index.json.jbuilder'
  end

  def show
    @mosaic = Mosaic.find(params[:id])

    render 'show.json.jbuilder'
  end

  def create
    @mosaic = Mosaic.new(
                          name: params[:name],
                          description: params[:description],
                          price: params[:price],
                          picture_url: params[:picture_url]
                        )
    if @mosaic.save
      render 'show.json.jbuilder'
    else
      render json: {errors: @mosaic.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @mosaic = Mosaic.find(params[:id])

    @mosaic.name = params[:name] || @mosaic.name
    @mosaic.description = params[:description] || @mosaic.description
    @mosaic.price = params[:price] || @mosaic.price

    if @mosaic.save
      render 'show.json.jbuilder'
    else
      render json: {errors: @mosaic.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @mosaic = Mosaic.find(params[:id])
    @mosaic.delete
    render json: {message: "Mosaic Removed"}
  end
end





