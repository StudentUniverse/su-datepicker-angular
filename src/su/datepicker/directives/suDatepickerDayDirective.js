angular.module('su.datepicker.directives.suDatepickerDayDirective', [
  'su.datepicker.directives.suDatepickerCheapEventDirective'
])
  .directive('suDatepickerDay', suDatepickerDayDirective);

suDatepickerDayDirective.$inject = [];
function suDatepickerDayDirective($filter) {
  return {
    restrict: 'E',
    require: '^^suDatepickerMonthDefault',
    templateUrl: 'su.datepicker.templates.suDatepickerDayTemplate'
  };
}
