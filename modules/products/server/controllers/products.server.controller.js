'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var responseCallback = function (res, product) {
  return function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(product);
  };
};

exports.read = function (req, res) {
  res.json(req.product ? req.product.toJSON() : {});
};

exports.create = function (req, res) {
  var product = new Product(req.body);

  product.save(responseCallback(res, product));
};

exports.update = function (req, res) {
  var product = req.product;

  _.assignIn(product, req.body);

  product.save(responseCallback(res, product));
};

exports.delete = function (req, res) {
  var product = req.product;

  product.remove(responseCallback(res, product));
};

exports.list = function (req, res) {
  Product.find().sort('-created').exec(function (err, products) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(products);
  });
};

exports.productByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'El id del producto es invalido'
    });
  }

  Product.findById(id).exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No se encontro el producto'
      });
    }

    req.product = product;
    next();
  });
};
