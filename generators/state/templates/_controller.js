'use strict';
var angular = require('angular');

function <%= stateName %>Ctrl($scope, $sessionStorage, $state, $filter) {
  $scope.state = '<%= stateName %>'
}

var stateConfig = {
  name: '<%= !!parent ? parent + '.' : '' %><%= stateName %>',
  url: '/<%= stateUrl %>',
  templateUrl: require('./<%= stateUrl %>.html'),
  controller: '<%= stateName %>Ctrl'
};

<%= stateName %>Ctrl.$inject = [
  '$scope',
  '$sessionStorage',
  '$state',
  '$filter'
]

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

angular.module('<%= moduleName %>')
  .controller('<%= stateName %>Ctrl', <%= stateName %>Ctrl)
  .config([ '$stateProvider', routeConfig ])

module.exports = stateConfig;
