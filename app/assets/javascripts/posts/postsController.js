app.controller('postsController', function($scope, $state, Post){
   Post.query(function(data) {
    $scope.posts = data;
  });

  $scope.delete = function(post_id) {
    Post.delete({id: post_id}, function(){
      $state.go('posts');
    })
  };
});

app.controller('showPostsController', function($scope, $stateParams, Post){  
   Post.get({ id: $stateParams.id }, function(data) {
    $scope.post = data;
  });
});

app.controller('updatePostsController', function($scope, $state, $stateParams, Post){  
  $scope.update = function() {
    Post.update({id: $stateParams.id}, $scope.post, function(){
      $state.go('post', {id: stateParams.id});      
    })
  };
});

app.controller('createPostsController', function($scope, $state, Post){  
  $scope.create = function() {
    Post.save($scope.post, function(){
      $state.go('posts');
    })
  };
});

