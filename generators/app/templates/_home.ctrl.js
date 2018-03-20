'use strict';
var angular = require('angular');

function homeCtrl($scope, $sessionStorage, $state, $filter, LoginSvc) {
  $scope.title = '<%= appName %>';
  $scope.navBar = require('../includes/navbar.html')
}

var stateConfig = {
  name: 'home',
  url: '/home',
  templateUrl: require('./home.html'),
  controller: 'homeCtrl'
};

homeCtrl.$inject = [
  '$scope',
  '$sessionStorage',
  '$state',
  '$filter',
  'LoginSvc'
]

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

angular.module('cmp')
  .controller('homeCtrl', homeCtrl)
  .config([ '$stateProvider', routeConfig ])

module.exports = stateConfig;
