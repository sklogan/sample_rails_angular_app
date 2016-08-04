receiveNotification = (user_id) ->
  App.room = App.cable.subscriptions.create({ channel: "Channel" + user_id } ,
    connected: ->
      # Called when the subscription is ready for use on the server
      return
    disconnected: ->
      # Called when the subscription has been terminated by the server
      return
    received: (data) ->
      @createLine(data)

    speak: (message)->
      @perform 'speak', message: message

    createLine: (data)->
      html = "<div class='direct-chat-info clearfix'>         <span class='direct-chat-name pull-left'>#{data['message']}</span></div>          <img alt='iamgurdeeposahan' src='http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg' class='direct-chat-img'>          <div class='direct-chat-text'>            #{data['message']}          </div>          <div class='direct-chat-info clearfix'>            <span class='direct-chat-timestamp pull-right'>3.36 PM</span>          </div>          <div class='direct-chat-info clearfix'>            <img alt='iamgurdeeposahan' src='http://bootsnipp.com/img/avatars/bcf1c0d13e5500875fdd5a7e8ad9752ee16e7462.jpg' class='direct-chat-img big-round'>            <span class='direct-chat-reply-name'>Singh</span>          </div>"
      $('.direct-chat-messages').append(html);

  )