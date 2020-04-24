module.controller('terms.DeleteTermController', [
  '$scope', '$uibModalInstance', 'Alert', 'term', 'TermService',
  function ($scope, $modalInstance,  $alert, term, TermService) {
    // the term object
    $scope.term = term;

    // flags if there is an ongoing request
    $scope.isLoading = false;

    // sets the isLoading flag
    $scope.setLoading = function (loading) {
      this.isLoading = loading;
    };

    // close teh modal
    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    // delete the term
    $scope.delete = function () {
      $alert.clear();
      $scope.setLoading(true);
      TermService.deleteTerm($scope.term.id).then(
        function () {
          $scope.setLoading(false);
          $modalInstance.close();
        },
        function (error) {
          $alert.error(error.error, $scope);
          $scope.setLoading(false);
        }
      );
    };
  }
]);