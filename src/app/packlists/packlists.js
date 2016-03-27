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

.controller( 'PacklistsCtrl', ['$scope', '$http', '$stateParams', '$timeout', function PacklistsCtrl( $scope, $http, $stateParams, $timeout ) {
  

  /*NAVBUTTONS JSON OBJECT*/
  $http.get('assets/json/lists/' + $stateParams.gender + '/' + $stateParams.vacation + '.json').success(function(data) {
    $scope.packlist = data;
  });  

  /*ADD ITEM TO ONE OF THE SUB LISTS*/
  $scope.addItem = function(inputField,list){
      
      //reset
      $scope.duplicateFound = false;
      $scope.doFade = false;
      /*$scope.fadeErrorMsg = false;
      $scope.checkAll[list]=false;*/

      //Check that inputfield not empty
      if($scope[inputField]!==""){
          
          //Add item to list
          /*$scope.packlist[list].push({item:$scope[inputField], done:false});
          $scope[inputField] = ""; */

          for (var index = 0; index < $scope.packlist[list].length; ++index) {
              var item = $scope.packlist[list][index];
              if(item.item.toUpperCase() == $scope[inputField].toUpperCase()){
                  $scope.duplicateFound = true;
                  fadeErrorMsg();
                  /*$timeout(function(){
                            $scope.doFade = true;
                        }, 9000);*/
                  break;
              }
          }
          if(!$scope.duplicateFound){
              $scope.packlist[list].push({item:$scope[inputField], done:false});
              $scope[inputField] = "";
          }
      }

      function fadeErrorMsg() {
        $timeout(function(){
          $scope.doFade = true;
        },1000);
      }
  };
}]);
