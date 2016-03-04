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
