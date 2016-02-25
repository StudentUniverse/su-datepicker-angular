function rawMonthExampleCtrl($scope) {
  var today = new Date(),
    potentialDate;
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

  //add active-date class if the date matches the selected date
  // or potential-date if the date matches the potential date
  $scope.getDateClass = function(date) {
    if (date) {
      if ($scope.date.getFullYear() === date.getFullYear() &&
        $scope.date.getMonth() === date.getMonth() &&
        $scope.date.getDate() === date.getDate()) {
        return 'active-date';
      } else if (potentialDate) {
        if (potentialDate.getFullYear() === date.getFullYear() &&
          potentialDate.getMonth() === date.getMonth() &&
          potentialDate.getDate() === date.getDate()) {
          return 'potential-date';
        }
      }
    }
  };

  $scope.cheapHover = function(date) {
    if (date) {
      potentialDate = date;
      $scope.$digest(); //needs to be triggered manually
    }
  };

  function addMonth(date, diff) {
    var copy = new Date(date);
    copy.setDate(1);
    copy.setMonth(copy.getMonth() + diff);
    return copy;
  }
}
