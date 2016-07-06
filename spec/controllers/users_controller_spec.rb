require 'rails_helper'

RSpec.describe UsersController, type: :controller do
	render_views
	let(:json) { JSON.parse(response.body) }

	describe 'GET #show' do
		before(:each) do 
			@user = FactoryGirl.create(:user)
		end

		it "should give the user details with valid user id" do
			get :show, params: {id: @user.id, format: :json}
			expect(assigns(:user)).to eq(@user)
			expect(response.header['Content-Type']).to include('application/json')
			expect(json).to eq(JSON.parse(@user.attributes.slice('id', 'first_name', 'last_name', 'email', 'description', 'title', 'public_email', 'website').merge(
				{ avatar: {thumb: @user.avatar.url(:thumb), medium: @user.avatar.url(:medium), original: @user.avatar.url} }).to_json)
			)
		end
	end
end
