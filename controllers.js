myApp.controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.stateIncludes = function (name) {
        return $state.includes(name);
    }
}]);
