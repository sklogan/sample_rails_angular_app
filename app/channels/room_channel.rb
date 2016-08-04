# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:channel]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)    
  	puts params.inspect
  	ActionCable.server.broadcast params[:channel], { message: data["message"], sender: current_user.first_name, sender_id: current_user.id, sender_image: current_user.avatar.url(:medium)}
  end
end
