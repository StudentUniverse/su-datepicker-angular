angular.module('su.datepicker.directives.suMonthDirective', [])
  .directive('suDatepickerMonth', suDatepickerMonthDirective);

function suDatepickerMonthDirective(){
  return {
    restrict: 'EA',
    scope: {
      date: '='
    },
    // templateUrl: 'suDatepickerTemplate.html',
    template: 'bla',
    controller: function($scope){

    }
  };
}
