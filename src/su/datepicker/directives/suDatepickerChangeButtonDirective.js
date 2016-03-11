angular.module('su.datepicker.directives.suDatepickerChangeButtonDirective', [])
  .directive('suDatepickerChangeButton', suDatepickerChangeButtonDirective);

suDatepickerChangeButtonDirective.$inject = [];
function suDatepickerChangeButtonDirective(){
  var BUTTON_TEXT = {
    previous: '&laquo',
    next: '&raquo',
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
