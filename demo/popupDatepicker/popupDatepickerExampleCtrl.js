function popupDatepickerExampleCtrl($scope, $document){
  $scope.destination = undefined;
  $scope.date = undefined;
  $scope.shown = false;

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
