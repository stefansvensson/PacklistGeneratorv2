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

.controller( 'FlexCtrl', function FlexCtrl( $scope, destinationService ) {

  /*destinationService.updateDestination(true);

  $scope.fromService = destinationService.sayHello("Stefan");
  $scope.abroad = destinationService.isAbroad();*/
/*  $scope.updateHeightOfImage = function(){
    var bckgrndImg = document.getElementById('background-image-container');
    var packlistFrame = document.getElementById('packlist-frame');

    if(packlistFrame.clientHeight+30>bckgrndImg.clientHeight){
      bckgrndImg.setAttribute("style","height:"+(packlistFrame.clientHeight+30)+"px")
    };
  };*/

  $scope.phText = 8;
  $scope.updatePhText = function(){
    $scope.phText+=8;
  };
});
