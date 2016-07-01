app.controller('registrationController', function($scope, $state, Auth){	
  $scope.register = function() {	
    Auth.register($scope.user, {}).then(function(registeredUser) {
    	$scope.user = registeredUser;
        $state.go('posts');
    }, function(error) {
        // Registration failed...
    });
  };

   $scope.logout = Auth.logout;
});