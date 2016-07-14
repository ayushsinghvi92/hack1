'use strict';

app.controller('UserDetailCtrl', function ($scope, Auth, user, Story, $state) {
  $scope.user = user;
  $scope.newStory = new Story({author_id: $scope.user.id});
  $scope.addStory = function () {
    $scope.newStory.save()
    .then(function (story) {
      $scope.newStory = new Story({author_id: $scope.user.id});
      $scope.user.stories.unshift(story);
    });
  };
  $scope.removeStory = function (story) {
    Auth.isAdmin()
      .then(function (maybeAdmin) {
        console.log(maybeAdmin)
        if(!maybeAdmin) return;
        else story.destroy()
      .then(function () {
        var idx = $scope.stories.indexOf(story);
        $scope.stories.splice(idx, 1);
      });
          
    })
  };
  $scope.gotoUserList = function () {
    $state.go('users');
  };
});
