class UsersController < ApplicationController
	def amy
		# this function is used to see if amy is logged in when she accesses one her 'her' pages
		if current_user
			render json: {message: "Amy's here"}
		else	
			render json: {errors: "Amy's not here"}, status: :bad_request #we have to say bad_request if we want it to be thrown as an error
		end
	end
	def create
		user = User.new(
	    	email: params[:email],
	     	password: params[:password],
	     	password_confirmation: params[:password_confirmation]
	    )
	    if user.save
	  		render json: {message: 'User created successfully'}, status: :created
	    else
	    	render json: {errors: user.errors.full_messages}, status: :bad_request
		end
	end
end
