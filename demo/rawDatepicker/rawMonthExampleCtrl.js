function rawMonthExampleCtrl($scope) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  $scope.date = new Date();

  $scope.nextMonth = function() {
    $scope.date = addMonth($scope.date, 1);
  };

  $scope.previousMonth = function() {
    $scope.date = addMonth($scope.date, -1);
  };

  $scope.isDisabled = function(date) {
    var dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return today > dateWithoutTime;
  };

  $scope.dateClicked = function(date) {
    $scope.date = date;
  };

  $scope.getDateClass = function(date) {
    var classes = [];
    if (date) {
      classes.push('btn btn-default btn-sm');
      if ($scope.date.getFullYear() === date.getFullYear() &&
        $scope.date.getMonth() === date.getMonth() &&
        $scope.date.getDate() === date.getDate()) {
        classes.push('active');
      }
    }
    return classes.join(' ');
  };

  function addMonth(date, diff) {
    var copy = new Date(date);
    copy.setDate(1);
    copy.setMonth(copy.getMonth() + diff);
    return copy;
  }
}
