describe('su.datepicker.directives.suDatepickerCheapEventDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerCheapEventDirective')).toBe(true);
    }));

    it('should register an event handler and call the callback without a $rootScope.$apply', function(){
      var $applySpy = spyOn($rootScope, '$apply');
      $rootScope.callback = jasmine.createSpy('callback');
      var element = $compile('<button su-datepicker-cheap-event="click" su-datepicker-cheap-event-click="callback()">click me</button>')($rootScope);
      $rootScope.$digest();
      element[0].click();
      expect($rootScope.callback).toHaveBeenCalled();
      expect($applySpy).not.toHaveBeenCalled();
    });

    it('should support multiple comma separated events', function(){
      var $applySpy = spyOn($rootScope, '$apply');
      $rootScope.clickCallback = jasmine.createSpy();
      $rootScope.focusCallback = jasmine.createSpy();
      var element = $compile('<input type="text" su-datepicker-cheap-event="click,focus" su-datepicker-cheap-event-click="clickCallback()" su-datepicker-cheap-event-focus="focusCallback()"/>')($rootScope);
      $rootScope.$digest();

      expect($rootScope.clickCallback.calls.count()).toEqual(0);
      expect($rootScope.focusCallback.calls.count()).toEqual(0);

      var focusEvent = document.createEvent('MouseEvents');
      focusEvent.initMouseEvent('focus', true, true, window, 0, 0, 0, 0, 0, false, false,
        false, false, 0, element[0]);
      element[0].dispatchEvent(focusEvent);
      element[0].click();

      expect($rootScope.clickCallback.calls.count()).toEqual(1);
      expect($rootScope.focusCallback.calls.count()).toEqual(1);
      expect($applySpy).not.toHaveBeenCalled();
    });

});
