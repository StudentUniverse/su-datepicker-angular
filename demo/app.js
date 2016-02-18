angular.module('app', ['su.datepicker'])
  .controller('basicDatepickerCtrl', basicDatepickerCtrl);

function basicDatepickerCtrl($scope){
  $scope.today = new Date();
}
