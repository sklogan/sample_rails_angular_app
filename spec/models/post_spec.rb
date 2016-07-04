require 'rails_helper'

RSpec.describe Post, type: :model do
  it "should be valid with valid attributes" do
  	post = FactoryGirl.build(:post)
  	expect(post).to be_valid
	end

	it "should be invalid without title" do
  	post = FactoryGirl.build(:post, title: nil)
  	expect(post).not_to be_valid
	end

	it "should be invalid without user" do
  	post = FactoryGirl.build(:post, user_id: nil)
  	expect(post).not_to be_valid
	end
end
