'use strict';

var angular = require('angular');

angular.module('<%= moduleName %>').constant('<%= moduleName %>Constants', {
  loginUrl: 'httpbin.org/basic-auth/admin/admin'
});
