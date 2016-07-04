require 'rails_helper'

RSpec.describe PostsController, type: :controller do
	describe "GET #create" do
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
	end
end
