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
  
  /*NAVBUTTONS JSON OBJECT*/
  $http.get('assets/json/navButtons.json').success(function(data) {
    $scope.navButtons = data;
  });
  

  $scope.genderSelection='';
  $scope.vacationSelection='';
  $scope.destinationSelection='';
/*  $scope.settingsProgress=0;*/

  $scope.updateSettings=function(scopeVar,selection){
/*    if(progress>$scope.settingsProgress){
      $scope.settingsProgress = progress;
    }*/

    $scope[scopeVar] = selection;
  };
}]);
