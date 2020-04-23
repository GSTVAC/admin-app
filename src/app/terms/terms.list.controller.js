'use strict';

var module = angular.module('supportAdminApp');

module.controller('terms.TermsListController', ['$scope',
  function ($scope) {
    // search
    $scope.formSearch = {
      isLoading: false,
      criteria: {
        legacy_id: ""
      },
      onlyNumbers: /^\d+$/,
      setLoading: function(loading) {
        this.isLoading = loading;
      }
    };

    /**
     * Search terms
     */
    $scope.search = function () {};

  }
]);