/*angular.
module('myServiceModule', []).
 controller('MyController', ['$scope', 'notify', function ($scope, notify) {
   $scope.callNotify = function(msg) {
     notify(msg);
   };
 }]).
factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }]);
*/

/*angular.module( 'ngBoilerplate.services', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.factory('getUrl', function(){
  return 'hej';
});*/

var services= angular.module('ngBoilerplate.services', []);

services.service('destinationService', function() {

  var abroad ='';

  this.isAbroad = function(){
    return abroad;
  };

  this.updateDestination = function(input){
    if(input==='domestic'){
      abroad=false;
    } else{
      abroad = '';
    }
  };
});
