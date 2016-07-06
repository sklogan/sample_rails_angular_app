require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
	include Devise::TestHelpers
	before(:each) do
		@request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user, first_name: 'old first name', last_name: 'old last name')
    sign_in user
  end

  it "should be a child of Devise::RegistrationsController" do
    expect(controller.class.superclass).to eq Devise::RegistrationsController
  end

	it "should update current_user first name and last name" do
		expect(subject.current_user).to_not eq(nil)		
    put :update, params: { user: { first_name: 'New first name', last_name: 'New last name', website: 'http://github.com', title: 'Data analyst', description: "About the user" } }
    subject.current_user.reload        
    expect(subject.current_user.first_name).to eq('New first name')
    expect(subject.current_user.last_name).to eq('New last name')
    expect(subject.current_user.website).to eq('http://github.com')
    expect(subject.current_user.title).to eq('Data analyst')
    expect(subject.current_user.description).to eq("About the user")
  end
end

