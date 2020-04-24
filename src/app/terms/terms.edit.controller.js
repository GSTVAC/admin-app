'use strict';

var module = angular.module('supportAdminApp');

module.controller('terms.EditTermController', ['$scope', 'AGREEABILITY_TYPE_DOCUSIGNABLE', 'Alert', 
  'TermService', '$rootScope', '$state', '$stateParams',
  function ($scope, AGREEABILITY_TYPE_DOCUSIGNABLE, $alert, TermService, $rootScope, $state, $stateParams) {
    $scope.docusignableAgrTypeId = AGREEABILITY_TYPE_DOCUSIGNABLE;

    // flags if there is an ongoing submit request
    $scope.processing = false;

    // the term object
    $scope.term = {};

    // to show the spinner while loading the record
    $scope.isLoading = false;

    // fetch initial data
    if ($stateParams.termId) {
      $scope.isLoading = true;
      TermService.findTermById($stateParams.termId)
        .then(function (data) {
          $scope.term = data;
          $scope.isLoading = false;
        })
        .catch(function (error) {
          $state.go('index.terms.list').then(function(){
            $alert.error(error.error, $rootScope);
          });
        });
    }

    // submits the form
    $scope.submitTerm = function () {
      $scope.processing = true;
      var entity = Object.assign({}, $scope.term);

      var submitPromise = null;

      if (entity.id) {
        delete entity.id;
        submitPromise = TermService.editTerm($scope.term.id, entity)
      } else {
        submitPromise = TermService.createTerm(entity)
      }

      submitPromise.then(function () {
        $scope.processing = false;
        $state.go('index.terms.list');
      }).catch(function (error) {
        $alert.error(error.error, $rootScope);
        $scope.processing = false;
      });
    };
  }
]);