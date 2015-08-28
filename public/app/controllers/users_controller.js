FoorumApp.controller('UsersController', function($scope, $location, Api){
  $scope.user = {};
  $scope.newUser = {};
  $scope.errorMessage;

  $scope.login = function() {
    if ($scope.user.username && $scope.user.password) {
      var credentials = {
        username: $scope.user.username,
        password: $scope.user.password
      };
      Api.login(credentials).success(function(user) {
        $location.path('/');
      }).error(function() {
        $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
      });
    }
  };

  $scope.register = function() {
    if ($scope.newUser.username
        && $scope.newUser.password
        && $scope.newUser.password == $scope.newUser.confirmPassword) {
      var user = {
        username: $scope.newUser.username,
        password: $scope.newUser.password
      };
      Api.register(user).success(function(user) {
        $location.path('/');
      }).error(function(error) {
        $scope.errorMessage = error.error;
      });
    }
  };

});
