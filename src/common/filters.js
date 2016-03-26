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

AwesomeFilters.filter('statusFilter', function(){
  return function(input,scope){
    var out = [];
    angular.forEach(input, function(item){
      if(item.done === filterStatus.status){
        out.push(item);
      }
    });
    return out;
  };
});