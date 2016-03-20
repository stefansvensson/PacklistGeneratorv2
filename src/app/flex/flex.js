angular.module( 'ngBoilerplate.flex', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'flex', {
    url: '/flex',
    views: {
      "main": {
        controller: 'FlexCtrl',
        templateUrl: 'flex/flex.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'FlexCtrl', function FlexCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
