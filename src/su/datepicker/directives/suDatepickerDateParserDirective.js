angular.module('su.datepicker.directives.suDatepickerDateParserDirective', [])
  .directive('suDatepickerDateParser', suDatepickerDateParserDirective);

// do not depend on this directive, it may be removed in the future
suDatepickerDateParserDirective.$inject = ['$filter'];
function suDatepickerDateParserDirective($filter) {
  var dateFilter = $filter('date');
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, controller){
      var format = attrs.suDatepickerDateParser || 'yyyy-MM-dd';

      controller.$formatters.push(function(value){
        return dateFilter(value, format);
      });
    }
  };
}
