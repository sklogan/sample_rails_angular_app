FactoryGirl.define do
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    email Faker::Internet.email
    password "123456"
    avatar { File.new("#{Rails.root}/spec/support/fixtures/image.jpg") }
  end
end
