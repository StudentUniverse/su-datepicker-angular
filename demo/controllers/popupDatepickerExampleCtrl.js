function popupDatepickerExampleCtrl($scope, $document){
  $scope.destination = undefined;
  $scope.date = undefined;
  $scope.shown = false;

  $scope.showDatepicker = function(){
    $scope.shown = true;
  };

  $scope.hideDatepicker = function(){
    $scope.shown = false;
  };

  $scope.dateSelectCallback = function(date){
    $scope.date = date;
    $scope.hideDatepicker();
  };

  $scope.submit = function(){
    alert('going to ' + $scope.destination + ' on ' + $scope.date);
  };
}
