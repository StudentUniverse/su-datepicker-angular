angular.module('su.datepicker.directives.suDatepickerDateParserDirective', [
  'su.datepicker.providers.suDatepickerDateParserProvider'
])
  .directive('suDatepickerDateParser', suDatepickerDateParserDirective);

suDatepickerDateParserDirective.$inject = ['suDatepickerDateParser'];
function suDatepickerDateParserDirective(suDatepickerDateParser) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, controller){
      var format = attrs.suDatepickerDateParser;

      controller.$formatters.push(function(value){
        return suDatepickerDateParser(value, format);
      });
    }
  };
}
