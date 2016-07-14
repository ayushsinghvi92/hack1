'use strict';

app.directive('userItem', function (Auth) {
  return {
    restrict: 'E',
    templateUrl: '/browser/app/user/item/user.item.html',
    scope: {
      user: '=model',
      glyphicon: '@',
      iconClick: '&',
      afterRemove: '&'
    },
    link: function (scope, elem, attrs) {
      if (attrs.hasOwnProperty('isForm')) scope.isForm = true;
      if (attrs.hasOwnProperty('iconClick')) scope.hasIconClick = true;
      if (!scope.isForm) {
        var hasInitialized = false;
        scope.$watch('user', function () {
          if (!hasInitialized) hasInitialized = true;
          else {
            Auth.isAdmin()
            .then( function (maybeAdmin) {
              if(!maybeAdmin) return; 
              else scope.user.save();
            })
          }
        }, true);
      }
      scope.removeUser = function () {
        if(!Auth.isAdmin()) return;
        scope.user.destroy()
        .then(function () {
          scope.afterRemove();
        });
      };
    }
  }
});
