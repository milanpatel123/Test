(function(){

'use strict';
angular.module('myApp', ['ngRoute', 'app.homeCtrl'])
	/*.constant("isActiveConfig", {
	    activeClass: "active"
	  })
   .directive("isActive", function($location, $rootScope, isActiveConfig) {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        if (element[0].nodeName.toLowerCase() !== "a") {
          return;
        }
        var locWatch = $rootScope.$on("$locationChangeSuccess", function(event, newUrl){
          var href = element.prop('href');
          if (newUrl !== href) {
            attr.$removeClass(name);
          } else {
            attr.$addClass(name);
          }
        });
        var name = attr.isActive || isActiveConfig.activeClass || "active";
        scope.$on("$destroy", locWatch);
      }
    }
  })*/
	.config(function ($routeProvider) {
	    $routeProvider.
	    when('/home', {
	        templateUrl: 'views/home.html',
			controller: 'homeCtrl'
	    }).
	    when('/about', {
	        templateUrl: 'views/about.html'
	    }).
	    when('/service', {
	        templateUrl: 'views/service.html'
	    }).
	    when('/event', {
	        templateUrl: 'views/events.html'
	    }).
	    when('/gallery', {
	        templateUrl: 'views/gallery.html'
	    }).
	    when('/contact', {
	        templateUrl: 'views/contact.html'
	    }).
	   
	    otherwise({
	        redirectTo: '/home'
	    });
	})
	
	.service('$appService', ['$http','$q', function($http, $q){
		return({
			getLanguageData: getLanguageData 
		});

		function getLanguageData(page_id, language) {
            var request = $http({
                method: "get",
                 url: "http://code.binarydots.in/translation/index.php/page_content/users/page_id/"+page_id+"/language/"+language,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }
		
	}])
	.controller('appCtrl', ['$rootScope', '$scope','$appService','$location', function($rootScope, $scope,$appService,$location){

		   $scope.$watch(function() {
		    return $location.path();
		  }, function(value) {
		    $scope.activeUrl = value;
		  });

		$scope.pageNumber=1;
	    if($scope.language == undefined){
	        $scope.language='english';
	    }
	    var language = $scope.language;
	    $appService.getLanguageData($scope.pageNumber,language).then(
	        function(response){
	            $scope.content=JSON.parse(response);
	        });

	    $rootScope.languageChange=function(language){
	        alert(language);
	     };

	}]);



}());