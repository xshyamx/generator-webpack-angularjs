'use strict';
function <%= moduleName %>Table(){
  return {
    restrict: 'A',
    scope: {
      rows: '=data'
    },
    templateUrl: require('./<%= moduleName %>-table.html'),
    link: function(scope, element, attrs, controller, transcludeFn){
      var unwatch = scope.$watch('rows', (nv, ov) => {
        if ( !!nv ) {
          unwatch();
          launch();
        }
      })
      function launch() {
        scope.headers = scope.rows.shift();
        console.log(scope.headers, scope.rows)
      }
    }
  }
}

angular.module('<%= moduleName %>')
  .directive('<%= moduleName %>Table', <%= moduleName %>Table)

module.exports = {
  name: '<%= moduleName %>Table',
  directive: <%= moduleName %>Table
}

