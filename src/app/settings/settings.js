angular.module( 'ngBoilerplate.settings', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'settings', {
    url: '/settings',
    views: {
      "content": {
        controller: 'SettingsCtrl',
        templateUrl: 'settings/settings.tpl.html'
      },
      "header": {
        templateUrl: 'header.tpl.html'
      },
      "footer": {
        templateUrl: 'footer.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'SettingsCtrl', ['$scope', '$http', function SettingsCtrl( $scope, $http ) {
  $http.get('assets/json/navButtons.json').success(function(data) {
    $scope.navButtons = data;
  });
}]);
