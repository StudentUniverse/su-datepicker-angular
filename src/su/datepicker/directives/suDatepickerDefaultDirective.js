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
      var today = new Date(),
        potentialDate;

      // need a seperate date reference for thing
      scope.currentDate = util.copyDateOnly(scope.date || new Date());

      scope.isDateDisabled = function(date) {
        if (attrs.hasOwnProperty(attrs.$normalize('disable-past'))) {
          return suTimeNeutralDateCompareFilter(date, today) === -1;
        }
        return false;
      };

      scope.moveMonth = function(diff) {
        scope.currentDate = util.changeMonth(scope.currentDate, diff);
      };

      scope.selectDate = function(date) {
        scope.date = date;
      };

      scope.getDateClass = function(date) {
        if (angular.isDate(date)) {
          if (scope.date.getFullYear() === date.getFullYear() &&
            scope.date.getMonth() === date.getMonth() &&
            scope.date.getDate() === date.getDate()) {
            return 'active-date';
          } else if (potentialDate) {
            if (potentialDate.getFullYear() === date.getFullYear() &&
              potentialDate.getMonth() === date.getMonth() &&
              potentialDate.getDate() === date.getDate()) {
              return 'potential-date';
            }
          }
        }
      };

      scope.setPotentialDate = function(date) {
        if (angular.isDate(date)) {
          potentialDate = date;
          scope.$digest();
        }
      };
    }
  };
}
