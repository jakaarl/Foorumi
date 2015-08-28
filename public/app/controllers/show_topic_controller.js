FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  var topicId = $routeParams.id;
  Api.getTopic(topicId).success(function(topic) {
    $scope.topic = topic;
  });

  $scope.newMessage = {};

  $scope.addMessage = function() {
    var message = $scope.newMessage;
    if (message.title && message.content) {
      console.log("Adding message to topic: " + topicId);
      var message = {
        title: message.title,
        content: message.content
      };
      Api.addMessage(message, topicId).success(function(message) {
        $location.path('/messages/' + message.id);
      }).error(function(error) {
        console.log(error);
      });
    }
  };
  
});
