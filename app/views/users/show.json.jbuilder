json.extract! @user, :id, :first_name, :last_name, :email, :title, :description, :website, :public_email
json.avatar do
	json.thumb @user.avatar.url(:thumb)
	json.medium @user.avatar.url(:medium)
	json.original @user.avatar.url
end
