var appHome = angular.module('app.homeCtrl', [])
.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	$scope.message = 'successfully integrate.';

	/*$http.get("users")
    .then(function(response) {
    	debugger;
        $scope.myWelcome = response.data;
    });*/
}]);