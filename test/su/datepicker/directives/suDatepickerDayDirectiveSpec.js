describe('su.datepicker.directives.suDatepickerDayDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerDayDirective')).toBe(true);
    }));

    it('should generate a button with the date', function(){
      $rootScope.day = new Date();
      var element = $compile('<su-datepicker-day date="day"></su-datepicker-day>')($rootScope);
      $rootScope.$digest();
      expect(element.find('button').length).toEqual(1);
      expect(element.text() == $rootScope.day.getDate()).toBe(true);
    });

    it('should call click callback function when clicked', function(){
      $rootScope.day = new Date();
      $rootScope.callback = jasmine.createSpy('callback');
      var element = $compile('<su-datepicker-day date="day" click-callback="callback(day)"></su-datepicker-day>')($rootScope);
      $rootScope.$digest();
      element.find('button')[0].click();
      $rootScope.$digest();
      expect($rootScope.callback).toHaveBeenCalled();
    });

  });
