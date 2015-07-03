/**
 * Module for the controller definition of the application api.
 * The ApplicationController is handling /api/applications requests.
 * @module {application:controller~ApplicationController} application:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ApplicationController;

var _ = require('lodash');
var debug = require('debug')('application');
var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Application model instance
 * @type {application:model~Application}
 */
var Application = require('./application.model').model;

/**
 * ApplicationController constructor
 * @classdesc Controller that handles /api/applications route requests
 * for the application api.
 * Uses the 'applicationId' parameter and the 'applicationParam' request property
 * to operate with the [main application API Model]{@link application:model~Application} model.
 * @constructor
 * @inherits ParamController
 * @see application:model~Application
 */
function ApplicationController(router) {
  ParamController.call(this, Application, router);

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
}

// define properties for the ApplicationController here
ApplicationController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: ApplicationController,

  create: function (req, res) {
    var self = this;
    debug('user', req.user);
    req.body['ownerId'] = req.user._id;
    req.body['clientId'] = this.model.generateRandomObjectId();
    req.body['clientSecret'] = this.model.generateRandomObjectId();

    this.model.create(req.body, function (err, document) {
      if (err) {
        return res.handleError(err);
      }

      return res.created(self.getResponseObject(document));
    });
  }

};

// inherit from ParamController
ApplicationController.prototype = _.create(ParamController.prototype, ApplicationController.prototype);