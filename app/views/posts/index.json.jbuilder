json.array!(@posts) do |post|
  json.extract! post, :id, :title, :user_id, :description, :created_at
  json.url post_path(post)
  json.user do |user|
	  json.first_name post.user.first_name
	  json.last_name post.user.last_name
	  json.email post.user.email
	end
end
