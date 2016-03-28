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

.controller( 'PacklistsCtrl', ['$scope', '$http', '$stateParams', '$timeout', 'destinationService', 'localStorageService', function PacklistsCtrl( $scope, $http, $stateParams, $timeout, destinationService, localStorageService) {
    /* TO DO 
    - Add list title from JSON $scope.listTitle
    - Change filter div to col-sm-4
    */

    // get default list 
    $http.get('assets/json/lists/' + $stateParams.gender + '/' + $stateParams.vacation + '.json').success(function(data) {
        $scope.defaultList = data;
        $scope.savedList = localStorageService.get($stateParams.gender + $stateParams.vacation);
        $scope.packlist =  $scope.savedList !== null ? $scope.savedList : $scope.defaultList;
        localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
    });  

    /*localStorageService.set($stateParams.gender + $stateParams.vacation, JSON.stringify($scope.packlist));
    $scope.test = localStorageService.get($stateParams.gender + $stateParams.vacation);
    localStorageService.set("test", $scope.packlist);*/
    //get list from local storage saved by user 
    /*$scope.savedList = localStorageService.get($stateParams.gender + $stateParams.vacation);*/

    //set packlist to saved list if =! null, else set packlist to default list 
    /*$scope.packlist =  $scope.defaultList; *//*$scope.savedList !== null ? $scope.savedList :*/
    
    /*$scope.sm=1;
    $scope.lg=2;

    $scope.test = $scope.sm > $scope.lg ? $scope.sm : $scope.lg;
    console.log($scope.packlist === null);
    console.log($scope.packlist);*/

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

            //No duplicate found, add to list
            if(!$scope.duplicateFound){
                $scope.checkAll[list]=false;
                $scope.packlist[list].push({item:$scope[inputField], done:false});
                $scope[inputField] = "";
                //Save list to local storage
                localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
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
            $scope.packlist.completeCounter[list] = items.length;
        } else{
            $scope.packlist.completeCounter[list] = 0;
        }

        //Save list to local storage
        localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
    };
    
    //COMPLETE COUNTER
/*    $scope.completedCounter = {
        clothes:0,
        toiletries:0,
        gadgets:0,
        rememberTo:0
    };*/
    $scope.updateCompletedCounter = function (item,list) {
        if (item.done===true) {
            $scope.packlist.completeCounter[list]++;
        } else {
            $scope.packlist.completeCounter[list]--;
        }
        if($scope.packlist[list].length === $scope.packlist.completeCounter[list]){
            $scope.checkAll[list]=true;
        } else {
            $scope.checkAll[list]=false;
        }
        //Save list to local storage
        localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
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
        angular.forEach($scope.packlist.completeCounter,function(value, key){
            $scope.packlist.completeCounter[key]=0;
        });

        //Uncheck the "Check all" boxes
        angular.forEach($scope.checkAll,function(value, key){
            $scope.checkAll[key]=false;
        });

        //Save list to local storage
        localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
    };

    $scope.deleteSingleItem = function(item,list){
            $scope.packlist[list].splice($scope.packlist[list].indexOf(item),1);
            //Save list to local storage
            localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
    };

    //filter on destination (international or domestic travel)
    $scope.abroadFilter = destinationService.isAbroad();
    $scope.destinationFilter = function(item) {
        if ($scope.abroadFilter==='') {
            return item;
        }else{
            if(item.abroad===$scope.abroadFilter){
                return item;
            }
        }
    };

    $scope.resetPacklist = function(){
        if (confirm('Are you sure you want to reset the packlist?')) {
            $scope.packlist=$scope.defaultList;
            //Save list to local storage
            localStorageService.set($stateParams.gender + $stateParams.vacation, $scope.packlist);
        }
    };
}]);
