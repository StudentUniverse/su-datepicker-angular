angular.module('su.datepicker.directives.suDatepickerDayDirective', [])
  .directive('suDatepickerDay', suDatepickerDayDirective);

suDatepickerDayDirective.$inject = ['$parse'];
function suDatepickerDayDirective($parse){
  return {
    restrict: 'E',
    template: '<button></button>',
    link: function(scope, element, attrs){
      var clickCallbackAttr = attrs.clickCallback,
          clickCallback = clickCallbackAttr && $parse(clickCallbackAttr);

      var date = scope[attrs.date];
      if(date){
        element.find('button').text(scope.day.getDate());

        if(clickCallbackAttr){
          element.on('click', function(event){
            clickCallback(scope, {date: date});
          });
        }
      }
    }
  };
}
