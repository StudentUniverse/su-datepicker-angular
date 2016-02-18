angular.module('su.datepicker.directives.suBasicDatepicker', [])
  .directive('suBasicDatepicker', suBasicDatepicker);

suBasicDatepicker.$inject = [];
function suBasicDatepicker(){
  return {
    restrict: 'E',
    templateUrl: 'su.datepicker.templates.suBasicDatepickerTemplate',
    scope: {
      date: '='
    }
  };
}
