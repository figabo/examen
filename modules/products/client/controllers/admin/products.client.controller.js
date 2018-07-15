(function () {
  'use strict';

  angular
    .module('products.admin')
    .controller('ProductsAdminController', ProductsAdminController);

  ProductsAdminController.$inject = ['$scope', '$state', '$window', 'productResolve', 'Notification'];

  function ProductsAdminController($scope, $state, $window, product, Notification) {
    var vm = this;

    vm.product = product;
    vm.form = {};

    vm.save = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      vm.product.createOrUpdate().then(function (res) {
        $state.go('admin.products.list');
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> El producto se ha guardado correctamente' });
      }).catch(function (res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Ha ocurrido un problema al guardar!' });
      });
    };

    vm.remove = function () {
      if ($window.confirm('¿Estas seguro de eliminar el producto?')) {
        vm.product.$remove(function () {
          $state.go('admin.products.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Se ha eliminado el producto!' });
        });
      }
    };
  }
}());
