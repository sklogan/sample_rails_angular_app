require "rails_helper"

RSpec.describe "Routing for users", type: :routing do

  it "routes /users/:id to users show" do
    expect(get "/users/1").to(route_to({:controller => "users", :action => "show", :id => "1" }))
  end

  it "should not route to delete" do
    expect(:delete => "/users/1").not_to be_routable
  end

  it "should not route to update" do
    expect(:put => "/users/1").not_to be_routable
    expect(:patch => "/users/1").not_to be_routable
  end
end
