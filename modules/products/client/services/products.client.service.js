(function () {
  'use strict';

  angular
    .module('products.services')
    .factory('ProductsService', ProductsService);

  ProductsService.$inject = ['$resource'];

  function ProductsService($resource, $log) {
    var Product = $resource('/api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Product.prototype, {
      createOrUpdate: function () {
        return this._id ? this.$update() : this.$save();
      }
    });

    return Product;
  }
}());
