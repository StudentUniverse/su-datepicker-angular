function popupDatepickerExampleCtrl($scope, $document){
  $scope.destination = undefined;
  $scope.date = undefined;
  $scope.shown = false;
  $scope.calendarDate = undefined;

  $scope.customClass = function(date){
    if (angular.isDate(date) && angular.isDate($scope.date)) {
      if ($scope.date.getFullYear() === date.getFullYear() &&
      $scope.date.getMonth() === date.getMonth() &&
      $scope.date.getDate() === date.getDate()) {
        return 'active-date';
      }
    }
  };

  $scope.showDatepicker = function(needsDigest){
    if(!$scope.shown){
      $scope.shown = true;
      if(needsDigest){
        $scope.$digest();
      }
    }
  };

  $scope.hideDatepicker = function(needsDigest){
    if($scope.shown){
      $scope.shown = false;
      if(needsDigest){
        $scope.$digest();
      }
    }
  };

  $scope.dateSelectCallback = function(date){
    $scope.date = date;
    $scope.hideDatepicker();
  };

  $scope.submit = function(){
    alert('going to ' + $scope.destination + ' on ' + $scope.date);
  };
}
