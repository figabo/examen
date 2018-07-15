'use strict';

var acl = require('acl');
acl = new acl(new acl.memoryBackend());

exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/products',
      permissions: '*'
    }, {
      resources: '/api/products/:productId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/products',
      permissions: ['get']
    }]
  }]);
};

exports.isAllowed = function (req, res, next) {
  var roles = req.user ? req.user.roles : ['guest'];

  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      return res.status(500).send('Unexpected authorization error');
    }

    if (!isAllowed) {
      return res.status(403).json({
        message: 'User is not authorized'
      });
    }

    next();
  });
};
