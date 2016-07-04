require 'rails_helper'

RSpec.describe User, type: :model do
  it "should be valid with correct attributes" do
  	user = FactoryGirl.build(:user)
  	expect(user).to be_valid
  end 	

  it "should not be valid without email" do
  	user = FactoryGirl.build(:user, email: '')
  	expect(user).not_to be_valid
  end 	  
end
