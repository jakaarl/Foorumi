FoorumApp.controller('TopicsListController', function($scope, $location, Api) {
  $scope.newTopic = {
    "name": null,
    "description": null
  };
  Api.getTopics().success(function(topics) {
    $scope.topics = topics;
  });

  $scope.addTopic = function() {
    var topic = $scope.newTopic;
    if (topic.name && topic.description) {
      Api.addTopic(topic).success(function(topic) {
        $location.path('/topics/' + topic.id);
      });
    }
  }
});
