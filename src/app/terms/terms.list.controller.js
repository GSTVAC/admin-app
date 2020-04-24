'use strict';

var module = angular.module('supportAdminApp');

module.controller('terms.TermsListController', ['$scope', 'Alert', '$rootScope', 'TermService',
  function ($scope, $alert, $rootScope, TermService) {
    var perPage = 25;

    // search
    $scope.formSearch = {
      isLoading: false,
      criteria: {
        legacyId: ""
      },
      onlyNumbers: /^\d+$/,
      setLoading: function(loading) {
        this.isLoading = loading;
      }
    };

    // the current page number
    $scope.pageNumber = 1;

    // the total terms on backend
    $scope.totalTerms = 0;

    // terms data
    $scope.terms = [];

    /**
     * Search terms
     */
    $scope.search = function (pageReset) {
      $alert.clear();
      var legacyId = Number.parseInt($scope.formSearch.criteria.legacyId);

      $scope.terms = [];

      if(pageReset == true){
        $scope.pageNumber = 1;
      }
      var filter = '';
      filter += "page="+$scope.pageNumber;
      filter += "&perPage="+perPage;
      if(legacyId) {
        filter += "&legacyId="+legacyId;
      }

      $scope.formSearch.setLoading(true);
      TermService.search(
        {filter: filter}
      ).then(function (response) {
        $scope.terms = response.data.result;
        $scope.totalTerms = response.headers("X-Total");
        $scope.formSearch.setLoading(false);
      }).catch(function (error) {
        $alert.error(error.error, $rootScope);
        $scope.formSearch.setLoading(false);
      });
    };

      /**
       * change to a specific page
       */
      $scope.changePage = function (pageNumber) {
        if (pageNumber === 0 || pageNumber > $scope.getLastPage() || $scope.pageNumber === pageNumber) {
          return false;
        }
        $scope.pageNumber = pageNumber;
        $scope.search();
      };

      /**
       * move to the last page
       */
      $scope.getLastPage = function () {
        return parseInt($scope.totalTerms / perPage) + 1;
      };

      /**
       * get the number array that shows the pagination bar
       */
      $scope.getPageArray = function() {
        var res = [];
        for (var i = $scope.pageNumber - 5; i <= $scope.pageNumber; i++) {
          if (i > 0) {
            res.push(i);
          }
        }
        for (var i = $scope.pageNumber + 1; i <= $scope.getLastPage() && i <= $scope.pageNumber + 5; i++) {
          res.push(i);
        }
        return res;
      };

      // load the terms
      $scope.search(true);
  }
]);