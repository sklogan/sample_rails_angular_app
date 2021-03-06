app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'session/new.html',
      controller: 'sessionController'
    }).state('register', {
      url: '/register',
      templateUrl: 'users/register.html',
      controller: 'registrationController'
    }).state('edit_user', {
      url: '/users/edit',
      templateUrl: 'users/edit.html',      
      controller: 'userEditController'
    }).state('user', {
      url: '/users/{id}',
      templateUrl: 'users/show.html',      
      controller: 'userShowController'
    }).state('posts', {
      url: '/',
      templateUrl: 'posts/index.html',
      controller: 'postsController'
    }).state('new_post', {
      url: '/posts/new',
      templateUrl: 'posts/new.html'
    }).state('post', {
      url: '/posts/{id}',
      templateUrl: 'posts/show.html',
      controller: 'showPostsController'
    }).state('edit_post', {
      url: '/posts/{id}/edit',
      templateUrl: 'posts/edit.html',
      controller: 'showPostsController'
    }).state('chat', {
      url: '/chat/{id}',
      templateUrl: 'chat/chat.html',
      controller: 'chatController'    
    });
    $urlRouterProvider.otherwise('/');
});