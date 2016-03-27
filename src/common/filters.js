/*angular.module('ngBoilerplate.filters', []).filter('capitalize', function() {
  return function(input, scope) {
    if(input!=null) {
      input=input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  };
});*/


var AwesomeFilters= angular.module('AwesomeFilters', []);


AwesomeFilters.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null) {
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  };
});
