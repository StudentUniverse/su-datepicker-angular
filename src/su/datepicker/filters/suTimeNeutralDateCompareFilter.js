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
