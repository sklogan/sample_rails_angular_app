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

app.controller('userShowController', function($scope, $state, $stateParams, User){  
  User.get({ id: $stateParams.id }, function(data) {
    $scope.user = data;
  });
  
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