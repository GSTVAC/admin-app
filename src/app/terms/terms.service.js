'use strict';

angular.module('supportAdminApp')
  .factory('TermService', ['$log', '$q', '$http', 'TERMS_V5_API_URL',
    function ($log, $q, $http, TERMS_V5_API_URL) {
      var TermService = {};

      /**
       * Handle API response error
       * @param  {Error}      error           the error as received in catch callback
       * @param  {Object}     deferred        the deferred object
       */
      TermService.handleError = function (error, deferred) {
        $log.error(error);
        var err;
        if (error && error.data) {
          err = {
            status: error.status,
            error: error.data.message
          };
        }
        if (!err) {
          err = {
            status: error.status,
            error: error.message
          };
        }
        deferred.reject(err);
      }

      /**
       * Get base API path
       *
       * @return {String} base path
       */
      TermService.getBasePath = function () {
        return TERMS_V5_API_URL;
      };


      /**
       * Get a list of all the terms
       */
      TermService.search = function (options) {
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: TermService.getBasePath() + '/terms?' + options.filter,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          TermService.handleError(error, deferred);
        });
        return deferred.promise;
      };

      /**
       * Create a term
       */
      TermService.createTerm = function (entity) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          data: entity,
          headers: {
            'Content-Type': 'application/json'
          },
          url: TermService.getBasePath() + '/terms',
        }).then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
          TermService.handleError(error, deferred);
        });
        return deferred.promise;
      }

      /**
       * Edit the term
       */
      TermService.editTerm = function (id, entity) {
        var deferred = $q.defer();
        $http({
          method: 'PATCH',
          data: entity,
          headers: {
            'Content-Type': 'application/json'
          },
          url: TermService.getBasePath() + '/terms/' + id,
        }).then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
          TermService.handleError(error, deferred);
        });
        return deferred.promise;
      }

      /**
       * find the term by Id
       */
      TermService.findTermById = function (termId) {
        var deferred = $q.defer();
        $http({
          url: TermService.getBasePath() + '/terms/' + termId + '?noauth=true',
        }).then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
          TermService.handleError(error, deferred);
        });
        return deferred.promise;
      }
      return TermService;
    }
]);
