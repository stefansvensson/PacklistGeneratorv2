var filters= angular.module('ngBoilerplate.filters', []);

filters.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null) {
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  };
});

/*filters.filter('destinationFilter', ['destinationService', function(destinationService){
  return function(input, scope){
    var abroad = destinationService.isAbroad();
    if(input.abroad===abroad || input.abroad===''){
      return  input;
    }
  };
}]);*/