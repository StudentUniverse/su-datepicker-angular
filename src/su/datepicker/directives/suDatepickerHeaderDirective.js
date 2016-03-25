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
