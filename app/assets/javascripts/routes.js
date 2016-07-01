// app.config(function ($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'posts/index.html',
//       controller: 'postsController'
//     }).when('/posts/new', {
//       templateUrl: 'posts/new.html',
//     }).when('/posts/:id', {
//       templateUrl: 'posts/show.html',
//       controller: 'showPostsController'
//     }).when('/posts/:id/edit', {
//       templateUrl: 'posts/edit.html',
//       controller: 'showPostsController'
//     })  
//     .otherwise({
//       redirectTo: '/'
//     });
// });

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
    }).state('edit.user', {
      url: '/users/edit',
      templateUrl: 'users/edit.html'      
    }).state('posts', {
      url: '/',
      templateUrl: 'posts/index.html',
      controller: 'postsController'
    }).state('new.post', {
      url: '/posts/new',
      templateUrl: 'posts/new.html'
    }).state('post', {
      url: '/posts/{id}',
      templateUrl: 'posts/show.html',
      controller: 'showPostsController'
    }).state('edit.post', {
      url: '/posts/{id}/edit',
      templateUrl: 'posts/edit.html',
      controller: 'showPostsController'
    });
    $urlRouterProvider.otherwise('/');
});