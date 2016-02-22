angular.module('su.datepicker.directives.suDatepickerCheapEventDirective', [])
  .directive('suDatepickerCheapEvent', suDatepickerCheapEventDirective);

// do not depend on this directive, it may be removed in the future
suDatepickerCheapEventDirective.$inject = ['$parse'];
function suDatepickerCheapEventDirective($parse) {
  return {
    compile: function(element, attrs) {
      var dirAttr = 'su-datepicker-cheap-event';
      var event = attrs[attrs.$normalize(dirAttr)];
      var eventExpressionAttr = dirAttr + '-' + event;
      var eventFunction = $parse(attrs[attrs.$normalize(eventExpressionAttr)]);
      return function postLink(scope, element) {
        element.on(event, function(event) {
          eventFunction(scope, {
            $event: event
          });
        });
      };
    }
  };
}
