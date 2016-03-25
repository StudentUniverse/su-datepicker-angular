function rangeDatepickerExampleCtrl($scope, suTimeNeutralDateCompareFilter) {
  var today = new Date(),
    potentialDate;

  $scope.start = undefined;
  $scope.end = undefined;
  $scope.calendarDate = undefined; //will default to today

  $scope.isDateDisabled = function(date) {
    if (angular.isDate(date)) {
      return suTimeNeutralDateCompareFilter(date, today) === -1;
    }
    return false;
  };

  $scope.onDateSelect = function(date) {
    if (angular.isDate(date)) {
      if ($scope.start && $scope.end) {
        $scope.start = undefined;
        $scope.end = undefined;
      }

      if ($scope.start) {
        var comparisonResult = suTimeNeutralDateCompareFilter($scope.start, date);
        if (comparisonResult === 0) {
          return;
        } else if (comparisonResult === -1) {
          $scope.end = copyDateOnly(date);
        } else {
          // the selected value is less than the start date so swap them
          $scope.end = copyDateOnly($scope.start);
          $scope.start = copyDateOnly(date);
        }
      } else {
        $scope.start = copyDateOnly(date);
      }
    }
  };

  $scope.setPotentialDate = function(date) {
    if (angular.isDate(date)) {
      potentialDate = date;
      $scope.$digest(); //have to call manually
    }
  };

  $scope.clearPotentialDate = function(date){
    potentialDate = undefined;
    $scope.$digest(); //have to call manually
  };

  $scope.getDateClass = function(date) {
    var classes = [];
    if (date) {
      if (angular.isDefined($scope.start)) {
        if(suTimeNeutralDateCompareFilter(date, $scope.start) === 0){
          classes.push('start-date');
        }

        if (angular.isDefined($scope.end)) {
          if(suTimeNeutralDateCompareFilter(date, $scope.end) === 0){
            classes.push('end-date');
          }

          if (dateInRange(date, $scope.start, $scope.end)) {
            classes.push('selected-range');
          }
        } else {
          if (angular.isDefined(potentialDate)) {
            // potentialDate could be less, making it the start
            var start = suTimeNeutralDateCompareFilter(potentialDate, $scope.start) <= 0 ? potentialDate : $scope.start;
            var end = suTimeNeutralDateCompareFilter(potentialDate, $scope.start) <= 0 ? $scope.start : potentialDate;
            if (dateInRange(date, start, end)) {
              classes.push('potential-range');
            }
          }
        }
      }
    }
    return classes.join(' ');
  };

  $scope.disableNextMonth = function(currentDate) {
    if (angular.isDate(currentDate)) {
      var nextYear = today.getFullYear() + 1;
      if (currentDate.getFullYear() > nextYear) {
        return true;
      } else if (currentDate.getFullYear() === nextYear &&
        currentDate.getMonth() >= today.getMonth()) {
        return true;
      }
    }
    return false;
  };

  //private
  function copyDateOnly(date) {
    if (angular.isDate(date)) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
  }

  function dateInRange(date, start, end) {
    return suTimeNeutralDateCompareFilter(date, start) >= 0 &&
      suTimeNeutralDateCompareFilter(date, end) <= 0;
  }
}
