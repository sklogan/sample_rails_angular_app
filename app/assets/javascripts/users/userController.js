app.controller('registrationController', function($scope, $state, Auth){	
  $scope.register = function() {	
    Auth.register($scope.user, {}).then(function(registeredUser) {
    	$scope.user = registeredUser;
        $state.go('posts');
    }, function(error) {
      $scope.errors = error.data.errors;  
    });
  };

   $scope.logout = Auth.logout;
});

app.controller('userUpdateController', function($scope, $state, Auth, User, Upload){	
	Auth.currentUser().then(function(user) {
	    $scope.user = user;
	}, function(error) {
	    $scope.user = {}
	});

	$scope.update = function(){		
    Upload.upload({
      url: '/users.json',
      method: 'PUT',
      fields: { user: {first_name: $scope.user.first_name, avatar: $scope.user.avatar, last_name: $scope.user.last_name} }
    }).success(function(data, status, headers, config) {
        $state.go('posts')
    });
	}
});

app.controller('userShowController', function($scope, $state, $stateParams, Auth, User){  

  User.get({ id: $stateParams.id }, function(data) {
    $scope.user = data;
  });

  Auth.currentUser().then(function(current_user) {
    $scope.current_user = current_user;
  }, function(error) {
    $scope.current_user = {}
  });

  $scope.showChatBox = function(){
    var chat_box = angular.element(document.querySelector('#qnimate'));
    chat_box.addClass('popup-box-on');
    createChat($scope.current_user.id + "room" + $scope.user.id);
    return false;
  };

  $scope.sendChat = function(){
    App.room.speak($scope.message);
  };

  
  var createChat = function(room_id) {
    return App.room = App.cable.subscriptions.create({
      channel: "RoomChannel",
      room: room_id
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
        html = "<div class='direct-chat-info clearfix'> <span class='direct-chat-name pull-left'>" + data['sender'] + "</span></div> <img alt='"+data['sender']+"' src='"+data['sender_image']+"' class='direct-chat-img'> <div class='direct-chat-text'> " + data['message'] + " </div> <div class='direct-chat-info clearfix'> <span class='direct-chat-timestamp pull-right'>3.36 PM</span>  </div>";
        return $('.direct-chat-messages').append(html);
      }
    });
  };  
});

app.controller('userEditController', function($scope, $state, Auth, Upload, User){  
  
  Auth.currentUser().then(function(user) {
    User.get({ id: user.id }, function(data) {
      $scope.user = data;
    });
  }, function(error) {
    $scope.user = {}
  });  

  $scope.update = function() {
    User.update({user: $scope.user}, function(){
      $state.go('edit_user');      
    })
  };

  $scope.avatarUpload = function(){   
    Upload.upload({
      url: '/users.json',
      method: 'PUT',
      fields: { user: {avatar: $scope.user.avatar} }
    }).success(function(data, status, headers, config) {
      $state.go('edit_user')
    });
  };

  $scope.removeAvatar = function(){   
    User.update({user: { avatar: '' }}, function(){
      $state.go('edit_user');      
    })
  }
  
});