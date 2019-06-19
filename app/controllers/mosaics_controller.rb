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
                          price: params[:price]
                        )
    # binding.pry   


    if params[:image].size > 15000000 #limits image size to 15mb max (still kinda big tbh)
      render json: {errors: "Picture to big"}, status: :unprocessable_entity
    else
      @mosaic.image.attach(params[:image])
      if @mosaic.save
        render 'show.json.jbuilder'
      else
        render json: {errors: @mosaic.errors.full_messages}, status: :unprocessable_entity
      end

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


private

  def post_params
    params.require(:post).permit(:name, :description, :price, :picture)
  end


end





