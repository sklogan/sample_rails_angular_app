json.extract! @post, :id, :title, :description, :created_at, :updated_at
json.user do
	json.first_name @post.user.first_name
	json.last_name @post.user.last_name
end
