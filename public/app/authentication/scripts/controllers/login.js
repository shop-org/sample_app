'use strict';

/**
 * @ngdoc function
 * @name authModApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authModApp
 */
angular.module('authModApp')
  .controller('LoginCtrl', ["$location","$auth",loginCtrl]);

  function loginCtrl($location,$auth) {
    var logCl = this;
    logCl.user = {};
    logCl.submitLogin = submitLogin;
    logCl.authenticate = function(provider) {
      $auth.authenticate(provider);

      $location.path("/");
      
    };
    function submitLogin(){
    	//authorize.login(logCl.user)
      $auth.login(logCl.user)
    	.then(function(response){
	    		$location.path("/");
          console.log($auth.isAuthenticated());
          userData.setUser(response.data.user);
          console.log(userData.getUser());
    		},function(response){
    			console.log(response);
    		});
    }
  }


  /*
	<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1068203956594250',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
  */