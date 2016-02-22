angular.module('su.datepicker.directives.suDatepickerMonthDefaultDirective', [])
  .directive('suDatepickerMonthDefault', suDatepickerMonthDefaultDirective);

suDatepickerMonthDefaultDirective.$inject = [];
function suDatepickerMonthDefaultDirective(){
  return {
    restrict: 'E',
    scope: {
      date: '=',
      clickCallback: '&',
      dateDisabled: '&',
      customClass: '&',
      cheapMouseenterCallback: '&'
    },
    templateUrl: function(element, attrs){
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerMonthDefaultTemplate';
    }
  };
}
