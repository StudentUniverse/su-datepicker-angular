angular.module('su.datepicker.directives.suDatepickerRangeDefaultDirective', [
  'su.datepicker.filters.suTimeNeutralDateCompareFilter',
  'su.datepicker.filters.suDatepickerMonthTextFilter'
  ])
  .directive('suDatepickerRangeDefault', suDatepickerRangeDefaultDirective);

suDatepickerRangeDefaultDirective.$inject = ['$filter'];
function suDatepickerRangeDefaultDirective($filter){
  var suTimeNeutralDateCompareFilter = $filter('suTimeNeutralDateCompare'),
      suDatepickerMonthTextFilter = $filter('suDatepickerMonthText');

  return {
    restrict: 'E',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerRangeDefaultTemplate';
    },
    scope: {
      startDate: '=',
      isDateDisabled: '&',
      onDateSelect: '&',
      cheapMouseenterCallback: '&',
      cheapMouseoutCallback: '&',
      customClass: '&',
      previousMonthDisabled: '&',
      nextMonthDisabled: '&',
      header: '&'
    },
    link: function(scope, element, attrs){
      if(!attrs.hasOwnProperty('startDate')){
        throw "su.datepicker.directives.suDatepickerRangeDefault: start-date attribute is required";
      }

      var today = new Date(),
        potentialDate,
        pastDisabled = attrs.hasOwnProperty(attrs.$normalize('disable-past'));

      // need a seperate date reference for second calendar tracking
      // will be updated by the startDate $watch
      scope.nextDate = undefined;

      if(attrs.hasOwnProperty('isDateDisabled')){
        var originalDateDisabled = scope.isDateDisabled;
        scope.isDateDisabled = function(date){
          return originalDateDisabled({date: date});
        };
      } else {
        scope.isDateDisabled = function(date) {
          if (pastDisabled) {
            return suTimeNeutralDateCompareFilter(date, today) === -1;
          }
          return false;
        };
      }

      scope.moveMonth = function(diff) {
        scope.startDate = util.changeMonth(scope.startDate, diff);
      };

      if(attrs.hasOwnProperty('header')){
        var originalHeader = scope.header;
        scope.header = function(date){
          return originalHeader({date: date});
        };
      } else {
        scope.header = function(date) {
          if(angular.isDate(date)){
            var monthText = suDatepickerMonthTextFilter(date.getMonth());
            return monthText + ' ' + date.getFullYear();
          }
        };
      }

      if(pastDisabled && !attrs.hasOwnProperty('previousMonthDisabled')){
        scope.previousMonthDisabled = function(variables) {
          var currentDate = variables && variables.currentDate;
          if (angular.isDate(currentDate)) {
            if (today.getFullYear() > currentDate.getFullYear()) {
              return true;
            } else if (today.getFullYear() === currentDate.getFullYear() &&
              today.getMonth() >= currentDate.getMonth()) {
              return true;
            }
          }
          return false;
        };
      }

      scope.$watch('startDate', function(newVal){
        // do not allow statDate to be undefined
        if(!angular.isDate(newVal)){
          scope.startDate = today;
        } else {
          // keep next calendat date in sync
          scope.nextDate = util.changeMonth(scope.startDate, 1);
        }
      });
    }
  };
}
