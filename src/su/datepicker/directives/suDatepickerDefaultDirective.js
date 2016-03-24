angular.module('su.datepicker.directives.suDatepickerDefaultDirective', [
  'su.datepicker.filters.suDatepickerMonthTextFilter',
    'su.datepicker.filters.suTimeNeutralDateCompareFilter'
  ])
  .directive('suDatepickerDefault', suDatepickerDefaultDirective);

suDatepickerDefaultDirective.$inject = ['$filter'];

function suDatepickerDefaultDirective($filter) {
  var suTimeNeutralDateCompareFilter = $filter('suTimeNeutralDateCompare'),
      suDatepickerMonthTextFilter = $filter('suDatepickerMonthText');

  return {
    restrict: 'E',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'su.datepicker.templates.suDatepickerDefaultTemplate';
    },
    scope: {
      date: '=',
      isDateDisabled: '&',
      selectDate: '&',
      cheapMouseenterCallback: '&',
      cheapMouseoutCallback: '&',
      customClass: '&',
      previousMonthDisabled: '&',
      nextMonthDisabled: '&',
      header: '&'
    },
    link: function(scope, element, attrs) {
      if(!attrs.hasOwnProperty('date')){
        throw 'su.datepicker.directives.suDatepickerDefault: date attribute is required';
      }
      var today = new Date(),
        pastDisabled = attrs.hasOwnProperty(attrs.$normalize('disable-past'));

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

      if(pastDisabled && !attrs.hasOwnProperty('previousMonthDisabled')){
        scope.previousMonthDisabled = function(variables) {
          var currentDate = variables && variables.date;
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

      scope.moveMonth = function(diff) {
        scope.date = util.changeMonth(scope.date, diff);
      };

      if(attrs.hasOwnProperty('selectDate')){
        var originalSelectDate = scope.selectDate;
        scope.selectDate = function(date){
          return originalSelectDate({date: date});
        };
      } else {
        scope.selectDate = function(date) {
          scope.date = date;
        };
      }

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

      scope.$watch('date', function(newVal){
        if(!angular.isDate(newVal)){
          scope.date = util.copyDateOnly(today);
        }
      });
    }
  };
}
