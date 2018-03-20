'use strict';

var angular = require('angular');

angular.module('<%= moduleName %>').constant('<%= moduleName %>Constants', {
  loginUrl: '/api/basic-auth/admin/admin'
});
