FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api) {
  var messageId = $routeParams.id;
  Api.getMessage(messageId).success(function(message) {
    $scope.message = message;
  });

  $scope.reply;
  $scope.addReply = function() {
    if ($scope.reply) {
      var reply = {
        content: $scope.reply
      };
      Api.addReply(reply, messageId).success(function(reply) {
        $scope.message.Replies.push(reply);
      });
    }
  }
});
