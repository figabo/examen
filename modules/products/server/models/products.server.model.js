'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  description: {
    type: String,
    trim: true,
    required: 'Es requerido'
  },
  price: {
    type: Number,
    required: 'Es requerido'
  },
  type: {
    type: String,
    default: 'p',
    trim: true
  },
  color: {
    type: String,
    default: '',
    trim: true
  },
  availability: {
    type: Boolean
  }
});

mongoose.model('Product', ProductSchema);
