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

});
