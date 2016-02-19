angular.module('su.datepicker.directives.suDatepickerDefaultDirective', [
    'su.datepicker.filters.suTimeNeutralDateCompareFilter'
  ])
  .directive('suDatepickerDefault', suDatepickerDefaultDirective);

suDatepickerDefaultDirective.$inject = ['$filter'];
function suDatepickerDefaultDirective($filter) {
  var suTimeNeutralDateCompareFilter = $filter('suTimeNeutralDateCompare');
  return {
    restrict: 'E',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerDefaultTemplate';
    },
    scope: {
      date: '=',
    },
    link: function(scope, element, attrs) {
      var today = new Date();

      // need a seperate date reference for thing
      scope.currentDate = util.copyDateOnly(scope.date);

      scope.isDateDisabled = function(date) {
        if(attrs.hasOwnProperty('disablePast')){
          return suTimeNeutralDateCompareFilter(date, today) === -1;
        }
        return false;
      };

      scope.moveMonth = function(diff) {
        scope.currentDate = util.changeMonth(scope.currentDateOne, diff);
      };

      scope.changeDate = function(date){
        scope.date = date;
      };
    }
  };
}
