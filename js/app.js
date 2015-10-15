var app = angular
  .module('app', [    
    'ngRoute',
    'ngAnimate'    
  ]) 
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'DeberiaController'        
      })
      .when('/compartir/:message', {
        templateUrl: 'views/main.html',
        controller: 'DeberiaController'
      })
      .when('/deberia/:question/:result', {
        templateUrl: 'views/main.html',
        controller: 'DeberiaController'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
      });
  });
