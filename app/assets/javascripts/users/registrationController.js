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

	$scope.update = function(file){		
    file.upload = Upload.upload({
      url: '/users.json',
      method: 'PUT',
      fields: { user: {first_name: $scope.user.first_name, avatar: $scope.user.avatar, last_name: $scope.user.last_name} }
    });
	}
});