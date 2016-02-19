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
