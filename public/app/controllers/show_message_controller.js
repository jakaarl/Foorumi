FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api) {
  var messageId = $routeParams.id;
  Api.getMessage(messageId).success(function(message) {
    $scope.message = message;
  });

  $scope.reply = {};

  $scope.addReply = function() {
    var reply = $scope.reply;
    if (reply && reply.content) {
      Api.addReply(reply, messageId).success(function(reply) {
        $scope.message.Replies.push(reply);
        $scope.reply = {};
      });
    }
  };

});
