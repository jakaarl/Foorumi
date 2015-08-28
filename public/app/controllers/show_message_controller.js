FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api) {
  var messageId = $routeParams.id;
  Api.getMessage(messageId).success(function(message) {
    $scope.message = message;
  });
});
