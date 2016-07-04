FactoryGirl.define do
  factory :post do
    title Faker::Book.title 
    description Faker::Lorem.paragraph
    association(:user)
  end
end
