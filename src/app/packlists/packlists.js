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

    /* PACKLIST JSON OBJECT */
    $http.get('assets/json/lists/' + $stateParams.gender + '/' + $stateParams.vacation + '.json').success(function(data) {
        $scope.packlist = data;
    });  

    /* ADD ITEM TO ONE OF THE SUB LISTS */
    $scope.addItem = function(inputField,list){

        //RESET VARIABLES 
        $scope.duplicateFound = false;
        $scope.doFade = false;

        //Check if inputfield empty
        if($scope[inputField]!==""){
            
            // Check if item already is in list
            for (var index = 0; index < $scope.packlist[list].length; ++index) {
                var item = $scope.packlist[list][index];
                if(item.item.toUpperCase() == $scope[inputField].toUpperCase()){
                    $scope.duplicateFound = true;
                    fadeErrorMsg();
                break;
                }
            }

            //Add item to list
            if(!$scope.duplicateFound){
                $scope.checkAll[list]=false;
                $scope.packlist[list].push({item:$scope[inputField], done:false});
                $scope[inputField] = "";
            }
        }
        
        //Timer for fading of error message
        function fadeErrorMsg() {
            $timeout(function(){
                $scope.doFade = true;
            },1000);
        }
    };

    //CHECK ALL
    $scope.checkAll = {
        clothes:false,
        toiletries:false,
        gadgets:false,
        rememberTo:false
    };
    $scope.completeAll = function (status,list) {
        var items = $scope.packlist[list];
        angular.forEach(items, function (item) {
            item.done = status;
        });
        //Update complete counter 
        if(status){
            $scope.completedCounter[list] = items.length;
        } else{
            $scope.completedCounter[list] = 0;
        }
    };
    
    //COMPLETE COUNTER
    $scope.completedCounter = {
        clothes:0,
        toiletries:0,
        gadgets:0,
        rememberTo:0
    };
    $scope.updateCompletedCounter = function (item,list) {
        if (item.done===true) {
            $scope.completedCounter[list]++;
        } else {
            $scope.completedCounter[list]--;
        }
        if($scope.packlist[list].length === $scope.completedCounter[list]){
            $scope.checkAll[list]=true;
        }
    };

    /*FILTERS*/
    $scope.itemFilter = '';
    $scope.changeItemStatus=function(status){
        if (typeof(status) === 'undefined') {
            $scope.itemFilter=status = ''; 
        }else{
            $scope.itemFilter=status; 
        } 
    };
    // filter by done attribute 
    $scope.statusFilter = function(item) {
        if ($scope.itemFilter==='') {
            return item;
        }else{
            if(item.done===$scope.itemFilter){
                return item;
            }
        }
    };

    // CLEAR COMPLETED
    $scope.clearCompleted = function() {

        clearListItems('clothes');
        clearListItems('gadgets');
        clearListItems('toiletries');
        clearListItems('rememberTo');

        function clearListItems(list){
            var oldList = $scope.packlist[list];
            $scope.packlist[list] = [];
            angular.forEach(oldList, function(x) {
                if (!x.done) {
                    $scope.packlist[list].push(x);
                }
            });
        }

        //Reset counter for completed items
        angular.forEach($scope.completedCounter,function(value, key){
            $scope.completedCounter[key]=0;
        });

        //Uncheck the "Check all" boxes
        angular.forEach($scope.checkAll,function(value, key){
            $scope.checkAll[key]=false;
        });
    };

}]);
