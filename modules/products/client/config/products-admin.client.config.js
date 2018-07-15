(function () {
  'use strict';

  angular
    .module('products.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'Authentication'];

  function menuConfig(menuService, Authentication) {
  }
}());
