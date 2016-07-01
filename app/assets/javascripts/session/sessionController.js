app.controller("sessionController", function($scope, $state, Auth){
  $scope.login = function() {
  	Auth.login($scope.user, {}).then(function(user) {
        console.log(user); // => {id: 1, ect: '...'}
        $state.go('posts');
    	}, function(error) {
        // Authentication failed...
    	});
    };
});
