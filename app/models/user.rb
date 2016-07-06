class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts    

  if Rails.env.test?
    has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" },
    	default_url: "/images/:style/missing.png",
    	path: ":rails_root/public/test/system/avatar/:id/:style/:filename",
    	url:  "/test/system/avatar/:id/:style/:filename"  	
  else
  	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" },
    	default_url: "/images/:style/missing.png",
    	path: ":rails_root/public/system/avatar/:id/:style/:filename",
    	url:  "/system/avatar/:id/:style/:filename"
  end  	
  
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates :first_name, presence: true     
end
