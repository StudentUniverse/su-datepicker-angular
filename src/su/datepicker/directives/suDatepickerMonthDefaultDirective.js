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
      cheapMouseenterCallback: '&',
      cheapMouseoutCallback: '&'
    },
    templateUrl: function(element, attrs){
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerMonthDefaultTemplate';
    },
    link: function(scope, element, attrs){
      if(!attrs.hasOwnProperty('date')){
        throw 'su.datepicker.directives.suDatepickerMonthDefault: date attribute is required';
      }
    }
  };
}
