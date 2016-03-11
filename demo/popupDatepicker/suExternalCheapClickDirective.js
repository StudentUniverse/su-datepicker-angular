function suExternalCheapClickDirective($document, $parse){
  return {
    restrict: 'A',
    compile: function(element, attrs){
      var callbackValue = attrs.suExternalCheapClick;
      if(callbackValue){
        var callbackFn = $parse(callbackValue);
        return function(scope, element, attrs, controller, transclude){
          var clickCallback = function(event){
            if(!element[0].contains(event.target)){ //outside click
              callbackFn(scope);
            }
          };

          $document.on('click', clickCallback);

          // clean up after ourselves if the scope is destroyed
          scope.$on('$destroy', function(){
            $document.off('click', clickCallback);
          });
        };
      } else {
        throw "suExternalClickDirective: no callback specified";
      }
    }
  };
}
