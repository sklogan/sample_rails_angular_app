require 'rails_helper'

RSpec.describe PostsController, type: :controller do
	render_views

	let(:json) { JSON.parse(response.body) }

	describe "GET #index" do		
		before(:each) do
			@post = FactoryGirl.create(:post)
			@user = @post.user
		end
		
		it "should render json with array of post including user details" do
			get :index, params: { format: :json }
			posts = assigns(:posts)
			expect(posts).to match_array([@post])
			expect(response.header['Content-Type']).to include('application/json')
			expect(json).to eq([JSON.parse(@post.attributes.except('user_id', 'updated_at').to_json).merge({'url' => post_path(@post), 'user' => {'first_name' => @user.first_name, 'last_name' => @user.last_name, 'email' => @user.email}})])
		end
	end

	describe "POST #create" do
		context "as a logged in user" do
			before(:each) do
				@user = FactoryGirl.create(:user)
				sign_in(@user)
			end
			
			it "should create a new post with valid record" do
				post :create, params: { post: { title: 'New post', description: 'post description'}, format: :json}
				post_record = assigns(:post)
				expect(post_record).to be_valid
				expect(post_record).not_to be_new_record
				expect(Post.count).to eq(1)
			end

			it "should not create a new post without valid record" do
				post :create, params: { post: { title: nil, description: 'post description'}, format: :json}
				expect(assigns(:post)).not_to be_valid
				expect(assigns(:post)).to be_new_record
				expect(Post.count).to eq(0)
			end
		end	

		context "not logged in" do					
			it "should not create a new post with valid record" do
				post :create, params: { post: { title: 'New post', description: 'post description'}, format: :json}
				expect(Post.count).to eq(0)
				expect(json).to eq({"error"=>"You need to sign in or sign up before continuing."})
			end

			it "should not create a new post without valid record" do
				post :create, params: { post: { title: nil, description: 'post description'}, format: :json}
				expect(Post.count).to eq(0)
				expect(json).to eq({"error"=>"You need to sign in or sign up before continuing."})
			end
		end	
	end

	describe "GET #show" do		
		before(:each) do
			@post = FactoryGirl.create(:post)
			@user = @post.user
		end
		
		it "should render json of post including user details" do
			get :show, params: {id: @post.id, format: :json }
			post_record = assigns(:post)
			expect(post_record).to eq(@post)
			expect(response.header['Content-Type']).to include('application/json')
			expect(json).to eq(JSON.parse(@post.attributes.to_json).merge({'user' => {'first_name' => @user.first_name, 'last_name' => @user.last_name}}))
		end
	end

end
