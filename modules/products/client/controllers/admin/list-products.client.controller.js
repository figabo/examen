(function () {
  'use strict';

  angular
    .module('products.admin')
    .controller('ProductsAdminListController', ProductsAdminListController);

  ProductsAdminListController.$inject = ['$state', 'ProductsService',];

  function ProductsAdminListController($state, ProductsService) {
    var vm = this;

    vm.products = ProductsService.query();

    vm.edit = function (product) {
  		$state.go('admin.products.list', product);
    };
  }
}());
