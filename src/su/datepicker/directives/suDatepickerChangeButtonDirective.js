angular.module('su.datepicker.directives.suDatepickerChangeButtonDirective', [])
  .directive('suDatepickerChangeButton', suDatepickerChangeButtonDirective);

suDatepickerChangeButtonDirective.$inject = [];
function suDatepickerChangeButtonDirective(){
  var BUTTON_TEXT = {
    previous: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.625 190.625" class="su-prev-arrow"><path d="M91.85 8.398l8.615 8.616L28.38 89.1h156.874v12.184H28.38l72.085 72.086-8.616 8.614L5.055 95.19"></svg>',
    next: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.625 190.625" class="su-next-arrow"><path d="M185.255 95.19l-86.793 86.795-8.617-8.615 72.086-72.086H5.057V89.1H161.93L89.846 17.014l8.617-8.616"/></svg>',
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
