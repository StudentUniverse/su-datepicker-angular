/**
* @license StudentUniverse su-datepicker 0.1.1
* (c) 2016 StudentUniverse https://www.studentuniverse.com
* License: ISC
**/
(function(){
'use strict';
angular.module('su.datepicker.directives.suDatepickerChangeButtonDirective', [])
  .directive('suDatepickerChangeButton', suDatepickerChangeButtonDirective);

suDatepickerChangeButtonDirective.$inject = [];
function suDatepickerChangeButtonDirective(){
  var BUTTON_TEXT = {
    previous: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.625 190.625" class="su-prev-arrow"><path d="M91.85 8.398l8.615 8.616L28.38 89.1h156.874v12.184H28.38l72.085 72.086-8.616 8.614L5.055 95.19"></svg>',
    next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.625 190.625" class="su-next-arrow"><path d="M185.255 95.19l-86.793 86.795-8.617-8.615 72.086-72.086H5.057V89.1H161.93L89.846 17.014l8.617-8.616"/></svg>',
  };

  var CLASS_MAP = {
    previous: 'su-datepicker-change-button-previous',
    next: 'su-datepicker-change-button-next'
  };

  return {
    restrict: 'E',
    scope: {
      clickCallback: '&',
      isDisabled: '&'
    },
    templateUrl: 'su.datepicker.templates.suDatepickerChangeButtonTemplate',
    compile: function(element, attrs){
      var type = attrs.type;
      if(type === 'next' || type === 'previous'){
        element.children().addClass(CLASS_MAP[type]);
        element.find('button').html(BUTTON_TEXT[type]);
      } else {
        throw 'su.datepicker.directives.suDatepickerChangeButtonDirective: must specify type of next or previous';
      }
    }
  };
}

angular.module('su.datepicker.directives.suDatepickerCheapEventDirective', [])
  .directive('suDatepickerCheapEvent', suDatepickerCheapEventDirective);

// do not depend on this directive, it may be removed in the future
suDatepickerCheapEventDirective.$inject = ['$parse'];

function suDatepickerCheapEventDirective($parse) {
  return {
    compile: function(element, attrs) {
      var dirAttr = 'su-datepicker-cheap-event';
      var events = attrs[attrs.$normalize(dirAttr)].split(',');
      var callbacks = {};
      events.forEach(function(event) {
        event = event.trim();
        var eventExpressionAttr = dirAttr + '-' + event;
        callbacks[event] = $parse(attrs[attrs.$normalize(eventExpressionAttr)]);
      });

      return function postLink(scope, element) {
        for (var eventName in callbacks) {
          element.on(eventName, getCallback(eventName));
        }

        function getCallback(eventName) {
          return function(event) {
            var eventCallback = callbacks[eventName];
            eventCallback(scope, {
              $event: event
            });
          };
        }

      };
    }
  };
}

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

angular.module('su.datepicker.directives.suDatepickerDayDirective', [
  'su.datepicker.directives.suDatepickerCheapEventDirective'
])
  .directive('suDatepickerDay', suDatepickerDayDirective);

suDatepickerDayDirective.$inject = [];
function suDatepickerDayDirective($filter) {
  return {
    restrict: 'E',
    require: '^^suDatepickerMonthDefault',
    templateUrl: 'su.datepicker.templates.suDatepickerDayTemplate'
  };
}

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

      scope.moveMonth = function(diff) {
        scope.date = util.changeMonth(scope.date, diff);
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

      scope.$watch('date', function(newVal){
        if(!angular.isDate(newVal)){
          scope.date = util.copyDateOnly(today);
        }
      });
    }
  };
}

angular.module('su.datepicker.directives.suDatepickerDirectivesModule', [
  'su.datepicker.directives.suDatepickerChangeButtonDirective',
  'su.datepicker.directives.suDatepickerCheapEventDirective',
  'su.datepicker.directives.suDatepickerDateParserDirective',
  'su.datepicker.directives.suDatepickerDayDirective',
  'su.datepicker.directives.suDatepickerDefaultDirective',
  'su.datepicker.directives.suDatepickerHeaderDirective',
  'su.datepicker.directives.suDatepickerMonthDefaultDirective',
  'su.datepicker.directives.suDatepickerMonthDirective',
  'su.datepicker.directives.suDatepickerRangeDefaultDirective',
]);

angular.module('su.datepicker.directives.suDatepickerHeaderDirective', [])
  .directive('suDatepickerHeader', suDatepickerHeaderDirective);

suDatepickerHeaderDirective.$inject = [];
function suDatepickerHeaderDirective() {
  return {
      restrict: 'E',
      scope: {
        header: '@'
      },
      templateUrl: 'su.datepicker.templates.suDatepickerHeaderTemplate',
  };
}

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

angular.module('su.datepicker.directives.suDatepickerMonthDirective', [])
  .directive('suDatepickerMonth', suDatepickerMonthDirective);

suDatepickerMonthDirective.$inject = [];
function suDatepickerMonthDirective(){
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      date: '='
    },
    link: function(scope, element, attrs, controller, transclude){
      scope.weeks = [];

      transclude(function(clone, transScope){
        transScope.weeks = scope.weeks;
        element.append(clone);
      });

      scope.$watch('date', function(newVal){
        if(angular.isDate(newVal)){
          var daysInMonth = util.getMonthDates(newVal.getFullYear(), newVal.getMonth());
          setWeeks(daysInMonth);
        }
      });

      function setWeeks(days){
        // clear existing
        scope.weeks.length = 0;

        var weeks = scope.weeks,
            firstWeek = true,
            weekIndex = 0;

        days.forEach(function(day){
          var dayOfWeek = day.getDay();
          if(firstWeek || dayOfWeek === 0){
            weeks[weekIndex] = new Array(7);
            weekIndex++;
            firstWeek = false;
          }
          weeks[weekIndex - 1][dayOfWeek] = day;
        });

        return weeks;
      }
    }
  };
}

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

angular.module('su.datepicker.filters.suDatepickerFiltersModule', [
  'su.datepicker.filters.suDatepickerMonthTextFilter',
  'su.datepicker.filters.suTimeNeutralDateCompareFilter'
]);

angular.module('su.datepicker.filters.suDatepickerMonthTextFilter', [])
  .filter('suDatepickerMonthText', suDatepickerMonthTextFilter);

function suDatepickerMonthTextFilter(){
  var monthTranslations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return function(monthIndex){
    if(typeof monthIndex === 'number' && monthIndex >= 0 && monthIndex < 12){
      return monthTranslations[monthIndex];
    }
  };
}

angular.module('su.datepicker.filters.suTimeNeutralDateCompareFilter', [])
  .filter('suTimeNeutralDateCompare', suTimeNeutralDateCompareFilter);

//-1 if date1 is less than date2
// 0 if date1 is greate than date2
suTimeNeutralDateCompareFilter.$inject = [];
function suTimeNeutralDateCompareFilter() {
  return function(date1, date2) {
    if (angular.isDate(date1) && angular.isDate(date2)) {
      if (date1.getFullYear() === date2.getFullYear()) {
        if (date1.getMonth() === date2.getMonth()) {
          if (date1.getDate() === date2.getDate()) {
            return 0;
          } else {
            return date1.getDate() < date2.getDate() ? -1 : 1;
          }
        } else {
          return date1.getMonth() < date2.getMonth() ? -1 : 1;
        }
      } else {
        return date1.getFullYear() < date2.getFullYear() ? -1 : 1;
      }
    }
  };
}

angular.module('su.datepicker.providers.suDatepickerDateParserProvider', [])
  .provider('suDatepickerDateParser', suDatepickerDateParserProvider);

suDatepickerDateParserProvider.$inject = [];
function suDatepickerDateParserProvider(){
  var defaultFormat = 'yyyy-MM-dd';

  function setDefaultDateFormat(format){
    if(angular.isString(format)){
      defaultFormat = format;
    }
  }

  $get.$inject = ['dateFilter'];
  function $get(dateFilter){
    return function(value, format){
      return dateFilter(value, format || defaultFormat);
    };
  }

  return {
    $get: $get,
    setDefaultDateFormat: setDefaultDateFormat
  };
}

angular.module('su.datepicker.providers.suDatepickerProvidersModule', [
  'su.datepicker.providers.suDatepickerDateParserProvider'
]);

angular.module('su.datepicker', [
  'su.datepicker.directives.suDatepickerDirectivesModule',
  'su.datepicker.filters.suDatepickerFiltersModule',
  'su.datepicker.providers.suDatepickerProvidersModule',
  'su.datepicker.templates.suDatepickerTemplatesModule' //generated by grunt-html2js
]);

var util = {
  getMonthDates: getMonthDates,
  copyDateOnly: copyDateOnly,
  changeMonth: changeMonth
};

// month is inclussive(0-11)
function getMonthDates(year, month){
  var days = [];
  if(typeof year === 'number' && typeof month === 'number'){
        var daysInMonth = getDaysInMonth(year, month + 1);

    for(var i = 1; i <= daysInMonth; i++){
      days.push(new Date(year, month, i));
    }
  }
  return days;
}

function copyDateOnly(date){
  var copy = new Date(date);
  copy.setHours(0,0,0,0);
  return copy;
}

function changeMonth(date, diff){
  var dateCopy = copyDateOnly(date);
  dateCopy.setDate(1);
  dateCopy.setMonth(dateCopy.getMonth() + diff);
  return dateCopy;
}

//private

// month is exclussive(1-12)
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

angular.module('su.datepicker.templates.suDatepickerTemplatesModule', ['su.datepicker.templates.suDatepickerChangeButtonTemplate', 'su.datepicker.templates.suDatepickerDayTemplate', 'su.datepicker.templates.suDatepickerDefaultTemplate', 'su.datepicker.templates.suDatepickerHeaderTemplate', 'su.datepicker.templates.suDatepickerMonthDefaultTemplate', 'su.datepicker.templates.suDatepickerRangeDefaultTemplate']);

angular.module('su.datepicker.templates.suDatepickerChangeButtonTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerChangeButtonTemplate',
    '<div class=su-datepicker-change-button><button type=button tabindex=-1 ng-click=clickCallback() ng-disabled=isDisabled()></button></div>');
}]);

angular.module('su.datepicker.templates.suDatepickerDayTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerDayTemplate',
    '<button class=su-datepicker-day type=button tabindex=-1 ng-if=day style="width: 100%" ng-click="clickCallback({date: day})" ng-class="customClass({date: day})" su-datepicker-cheap-event=mouseenter su-datepicker-cheap-event-mouseenter="cheapMouseenterCallback({date: day})" ng-disabled="dateDisabled({date: day})" ng-bind=day.getDate()></button>');
}]);

angular.module('su.datepicker.templates.suDatepickerDefaultTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerDefaultTemplate',
    '<div class="su-datepicker su-datepicker-default"><su-datepicker-change-button type=previous click-callback=moveMonth(-1) is-disabled="previousMonthDisabled({currentDate: date})"></su-datepicker-change-button><su-datepicker-header header={{header(date)}}></su-datepicker-header><su-datepicker-change-button type=next click-callback=moveMonth(1) is-disabled="nextMonthDisabled({currentDate: date})"></su-datepicker-change-button><div><su-datepicker-month-default date=date click-callback="selectDate({date: date})" date-disabled=isDateDisabled(date) custom-class="customClass({date: date})" cheap-mouseenter-callback=setPotentialDate(date) cheap-mouseout-callback=cheapMouseoutCallback()></su-datepicker-month-default></div></div>');
}]);

angular.module('su.datepicker.templates.suDatepickerHeaderTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerHeaderTemplate',
    '<div class=su-datepicker-header><strong ng-bind=header></strong></div>');
}]);

angular.module('su.datepicker.templates.suDatepickerMonthDefaultTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerMonthDefaultTemplate',
    '<su-datepicker-month date=date><table><thead><tr><th class=text-center>Sun</th><th class=text-center>Mon</th><th class=text-center>Tue</th><th class=text-center>Wed</th><th class=text-center>Thu</th><th class=text-center>Fri</th><th class=text-center>Sat</th></tr></thead><tbody su-datepicker-cheap-event=mouseleave su-datepicker-cheap-event-mouseleave="cheapMouseoutCallback({date: day})"><tr ng-repeat="week in weeks track by $index" class=su-datepicker-week-row><td ng-repeat="day in week track by $index" class=su-datepicker-day-of-week><su-datepicker-day></su-datepicker-day></td></tr></tbody></table></su-datepicker-month>');
}]);

angular.module('su.datepicker.templates.suDatepickerRangeDefaultTemplate', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('su.datepicker.templates.suDatepickerRangeDefaultTemplate',
    '<div class="su-datepicker su-datepicker-range"><div><su-datepicker-change-button type=previous click-callback=moveMonth(-1) is-disabled="previousMonthDisabled({currentDate: startDate})"></su-datepicker-change-button><su-datepicker-header header={{header(startDate)}}></su-datepicker-header><div><su-datepicker-month-default date=startDate click-callback="onDateSelect({date: date})" date-disabled=isDateDisabled(date) custom-class="customClass({date: date})" cheap-mouseenter-callback="cheapMouseenterCallback({date: date})" cheap-mouseout-callback=cheapMouseoutCallback()></su-datepicker-month-default></div></div><div><su-datepicker-header header={{header(nextDate)}}></su-datepicker-header><su-datepicker-change-button type=next click-callback=moveMonth(1) is-disabled="nextMonthDisabled({currentDate: nextDate})"></su-datepicker-change-button><div><su-datepicker-month-default date=nextDate click-callback="onDateSelect({date: date})" date-disabled=isDateDisabled(date) custom-class="customClass({date: date})" cheap-mouseenter-callback="cheapMouseenterCallback({date: date})" cheap-mouseout-callback=cheapMouseoutCallback()></su-datepicker-month-default></div></div></div>');
}]);
})();