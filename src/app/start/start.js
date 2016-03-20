angular.module( 'ngBoilerplate.start', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'start', {
    url: '/start',
    views: {
      "main": {
        controller: 'StartCtrl',
        templateUrl: 'start/start.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'StartCtrl', ['$scope', '$location', function($scope, $location) {

  $scope.hideHeader = $location.path() === '/start';  

}]);




