(function(angular){
'use strict';

/**
 * @ngdoc overview
 * @name authModApp
 * @description
 * # authModApp
 *
 * Main module of the application.
 */
angular
  .module('authModApp', [
    'ngCookies',
    'ngRoute',
    'satellizer'
  ])
  .config(function ($routeProvider,$httpProvider,$authProvider) {
    $routeProvider
      .when('/signup',{
        templateUrl:'app/authentication/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rcl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl'
      })
      .when('/login', {
        templateUrl: 'app/authentication/views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });
      $authProvider.loginUrl = "http://localhost:3000/authenticate/login";
      $authProvider.signupUrl = "http://localhost:3000/authenticate/signup";

      $authProvider.facebook({
        clientId: '1068203956594250',
        url:'http://localhost:3000/authenticate/auth/facebook',
        redirectUri: 'http://localhost:3000/'
      });
      //$httpProvider.interceptors.push('authInterceptor');
  });
})(window.angular);
