angular.module( 'ngBoilerplate.flex', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'flex', {
    url: '/flex',
    views: {
      "content": {
        controller: 'FlexCtrl',
        templateUrl: 'flex/flex.tpl.html'
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

.controller( 'FlexCtrl', function FlexCtrl( $scope ) {

});
