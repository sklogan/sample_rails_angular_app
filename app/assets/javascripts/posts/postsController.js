app.controller('postsController', function($scope, $state, Post, Auth){
   Post.query(function(data) {
    $scope.posts = data;    
    Auth.currentUser().then(function(user) {
      $scope.user = user;
    }, function(error) {
        $scope.user = {}
    });
  });

  $scope.delete = function(post_id) {
    Post.delete({id: post_id}, function(){
      $state.go('posts');
    })
  };
});

app.controller('showPostsController', function($scope, $stateParams, $sce, Post){  
  Post.get({ id: $stateParams.id }, function(data) {
    $scope.post = data;
  });
  $scope.getHtml = function(html){
    return $sce.trustAsHtml(html);
  };
});

app.controller('updatePostsController', function($scope, $state, $stateParams, Post){  
  $scope.update = function() {
    Post.update({id: $stateParams.id}, $scope.post, function(){
      $state.go('post', {id: stateParams.id});      
    })
  };
});

app.controller('createPostsController', function($scope, $state, Post){  
  console.log('called')
  $scope.create = function() {
    Post.save($scope.post, function(){
      $state.go('posts');
    });
  };
});

