function popupDatepickerExampleCtrl($scope, $document){
  $scope.destination = undefined;
  $scope.date = undefined;
  $scope.shown = false;

  $scope.showDatepicker = function(){
    if(!$scope.shown){
      $scope.shown = true;
    }
  };

  $scope.hideDatepicker = function(){
    if($scope.shown){
      $scope.shown = false;
    }
  };

  $scope.dateSelectCallback = function(date){
    $scope.date = date;
    $scope.hideDatepicker();
  };

  $scope.submit = function(){
    alert('going to ' + $scope.destination + ' on ' + $scope.date);
  };

  // if anywhere otuside the datepicker(su-click-trap) is clicked
  // close the datepicker
  $document.on('click', closeDatepickerOnClick);

  function closeDatepickerOnClick(){
    $scope.hideDatepicker();
    $scope.$digest();
  }

  // clean up after ourselves if the controller scope is destroyed
  $scope.$on('$destroy', function(){
    $document.off('click', closeDatepickerOnClick);
  });
}
