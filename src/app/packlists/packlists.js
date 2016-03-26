angular.module( 'ngBoilerplate.packlists', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'packlists', {
    url: '/packlists/:gender/:vacation',
    views: {
      "content": {
        controller: 'PacklistsCtrl',
        templateUrl: 'packlists/packlists.tpl.html'
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

.controller( 'PacklistsCtrl', ['$scope', '$http', '$stateParams', function PacklistsCtrl( $scope, $http, $stateParams ) {
  
  /*NAVBUTTONS JSON OBJECT*/
  $http.get('assets/json/lists/' + $stateParams.gender + '/' + $stateParams.vacation + '.json').success(function(data) {
    $scope.packlist = data;
  });  
}]);
