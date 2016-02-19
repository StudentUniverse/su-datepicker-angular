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
