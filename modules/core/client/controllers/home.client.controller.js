(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication'];

  function HomeController(scope, state, Authentication) {
    var vm = this;

    vm.credentials = Authentication;

    if (Authentication.user) {
      if (Authentication.user.roles.indexOf('admin') === -1) {
        state.go('products.list');
      }
      else {
        state.go('admin.products.list');
      }
    }
  }
}());
