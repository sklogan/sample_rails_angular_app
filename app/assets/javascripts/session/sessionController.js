app.controller("sessionController", function($scope, $state, Auth){
  $scope.login = function() {
  	Auth.login($scope.user, {}).then(function(user) {
        $state.go('posts');
    	}, function(error) {
    		console.log(error);
        $scope.errors = error.data.error;  
    	});
    };
});
