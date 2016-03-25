function defaultDatepickerExampleCtrl($scope) {
  $scope.date = new Date();
  $scope.calendarDate = new Date();

  $scope.customClass = function(date){
    if (angular.isDate(date) && angular.isDate($scope.date)) {
      if ($scope.date.getFullYear() === date.getFullYear() &&
      $scope.date.getMonth() === date.getMonth() &&
      $scope.date.getDate() === date.getDate()) {
        return 'active-date';
      }
    }
  };

  $scope.selectDate = function(date){
    $scope.date = date;
  };
}
