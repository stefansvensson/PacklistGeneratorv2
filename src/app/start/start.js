angular.module( 'ngBoilerplate.start', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'start', {
    url: '/start',
    views: {
      "content": {
        controller: 'StartCtrl',
        templateUrl: 'start/start.tpl.html'
      },
      "footer": {
        templateUrl: 'footer.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})


/*   .state('about', {
        url: '/about',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'partial-about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: 'table-data.html',
                controller: 'scotchController'
            }
        }
        
    });*/
/*
        .state('first', {
            url: "/first",
            views: {
                header: {
                    template: '<h1>First header</h1>',
                    controller: function($scope) {}
                },
                content: {
                    template: '<p>First content</>',
                    controller: function($scope) {}
                },
                footer: {
                    template: '<div>First footer</div>',
                    controller: function($scope) {}
                }
            }
        })*/

.controller( 'StartCtrl', ['$scope', '$location', function($scope, $location) {

  $scope.currentPath = $location.path();

}]);




