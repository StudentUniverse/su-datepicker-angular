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
      $rootScope.date = new Date();
      var element = $compile('<su-datepicker-day date="date"></su-datepicker-day>')($rootScope);
      $rootScope.$digest();
      expect(element.find('button').length).toEqual(1);
      expect(element.text()).toEqual($rootScope.date.getDate());
    });
  });
