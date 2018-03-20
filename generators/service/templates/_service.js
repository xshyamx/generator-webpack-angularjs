'use strict';

function <%= serviceName %>Svc($http, $sessionStorage, <%= moduleName %>Constants) {
  return {}
}

var serviceConfig = [
  '$http',
  '$sessionStorage',
  <%= moduleName %>Constants,
  <%= serviceName %>Svc
]

angular.module('<%= moduleName %>')
  .factory('<%= serviceName %>Svc', serviceConfig)

module.exports = {
  name: '<%= serviceName %>Svc',
  factory: serviceConfig
}
