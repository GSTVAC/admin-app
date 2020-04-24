'use strict';

var module = angular.module('supportAdminApp');

module.controller('terms.EditTermController', ['$scope', 'AGREE_FOR_DOCUSIGN_TEMPLATE', 'Alert', 
  'TermService', '$rootScope', '$state', '$stateParams', 'terms.Constants',
  function ($scope, AGREE_FOR_DOCUSIGN_TEMPLATE, $alert, TermService, $rootScope, $state, $stateParams, constants) {
    $scope.docusignableAgrTypeId = AGREE_FOR_DOCUSIGN_TEMPLATE;

    $scope.formConfig = {
      // options for agreeability type select
      agreeabilityTypeOptions: constants.AGREEABILITY_TYPES,
      // pattern to validate number input fields
      onlyNumbersPattern: /^\d+$/
    };

    // flags if there is an ongoing submit request
    $scope.processing = false;

    // the term object
    $scope.term = {};

    // to show the spinner while loading the record
    $scope.isLoading = false;

    // set to null the docusign template id when agreeability type is changed
    $scope.$watch('term.agreeabilityTypeId', function(newValue, oldValue){
      if (newValue !== AGREE_FOR_DOCUSIGN_TEMPLATE) {
        $scope.term.docusignTemplateId = null;
      }
    });

    // fetch initial data
    if ($stateParams.termId) {
      $scope.isLoading = true;
      TermService.findTermById($stateParams.termId)
        .then(function (data) {
          delete data.agreeabilityType;
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

      if (entity.agreeabilityTypeId !== AGREE_FOR_DOCUSIGN_TEMPLATE) {
        delete entity.docusignTemplateId;
      }

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