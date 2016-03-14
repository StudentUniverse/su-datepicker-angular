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
      var today = new Date();

      // need a seperate date reference for things like changing the month
      scope.currentDate = util.copyDateOnly(scope.date || new Date());

      if(attrs.hasOwnProperty('isDateDisabled')){
        var originalDateDisabled = scope.isDateDisabled;
        scope.isDateDisabled = function(date){
          return originalDateDisabled({date: date});
        };
      } else {
        scope.isDateDisabled = function(date) {
          if (attrs.hasOwnProperty(attrs.$normalize('disable-past'))) {
            return suTimeNeutralDateCompareFilter(date, today) === -1;
          }
          return false;
        };
      }

      scope.moveMonth = function(diff) {
        scope.currentDate = util.changeMonth(scope.currentDate, diff);
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
    }
  };
}
