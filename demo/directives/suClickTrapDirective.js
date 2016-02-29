function suClickTrapDirective() {
    return {
        restrict: 'E',
        transclude: true,
        link: function(scope, element, attrs, controller, transclude) {
            transclude(function(clone, scope){
                element.append(clone);
            });
            element.on('click', function(event) {
                event.stopPropagation();
            });
        }
    };
}
