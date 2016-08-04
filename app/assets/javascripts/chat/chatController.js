app.controller('chatController', function($scope, $stateParams, $q, User, Auth){    
  var user = User.get({ id: $stateParams.id }, function(data) {
    $scope.user = data;
  });  

  //console.log($q.resolve(user))  

  Auth.currentUser().then(function(current_user) {
    $scope.current_user = current_user;		
  }, function(error) {
    $scope.current_user = {}
  });

  $scope.date = new Date();

  $scope.$watch('user', function(){
    return App.room = App.cable.subscriptions.create({
      channel: 'RoomChannel',
      sender_id: $scope.current_user.id,
      receiver_id: $scope.user.id
    	}, {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        return this.createLine(data);
      },
      speak: function(message) {
        return this.perform('speak', {
          message: message
        });
      },
      createLine: function(data) {
        var html;
        html = "<div class='direct-chat-info clearfix'> <span class='direct-chat-name pull-left'>" + data['sender'] + "</span></div> <img alt='"+data['sender']+"' src='"+data['sender_image']+"' class='direct-chat-img'> <div class='direct-chat-text'> " + data['message'] + " </div>";
        $('#message-content').append(html);
        var chatEl = document.getElementById("message-content");
				chatEl.scrollTop = chatEl.scrollHeight;
				return ;
      }
    });    
    

  });	

  $scope.sendChat = function(){
    App.room.speak($scope.message);
    $scope.message = ""
  };  

  $scope.clearChat = function(){
  	var myEl = angular.element( document.querySelector( '#message-content' ) );
		myEl.empty();
		return false;
  };

  $scope.blockUser = function(){
  	return false;
  };

  
});
