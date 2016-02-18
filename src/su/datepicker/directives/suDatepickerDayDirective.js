angular.module('su.datepicker.directives.suDatepickerDayDirective', [])
  .directive('suDatepickerDay', suDatepickerDayDirective);

suDatepickerDayDirective.$inject = [];
function suDatepickerDayDirective(){
  return {
    restrict: 'E',

    link: function(scope, element, attrs){

    }

  };
}
