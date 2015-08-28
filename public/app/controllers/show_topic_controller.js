FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  var topicId = $routeParams.id;
  Api.getTopic(topicId).success(function(topic) {
    $scope.topic = topic;
  });

  $scope.messageTitle;
  $scope.messageContent;
  $scope.addMessage = function() {
    if ($scope.messageTitle && $scope.messageTitle) {
      var message = {
        title: $scope.messageTitle,
        content: $scope.messageContent
      };
      Api.addMessage(message, topicId).success(function(message) {
        $location.path('/messages/' + message.id);
      });
    }
  };
});
