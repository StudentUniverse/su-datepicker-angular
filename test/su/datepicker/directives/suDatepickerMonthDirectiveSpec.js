describe('su.datepicker.directives.suDatepickerMonthDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerMonthDirective')).toBe(true);
    }));

    it('should transclude element contents', function(){
      $rootScope.today = new Date();
      var contents = '<span>bla</span>';
      var element = $compile('<su-datepicker-month date="today">' + contents + '</su-datepicker-day>')($rootScope);
      $rootScope.$digest();
      expect(element.text()).toEqual('bla');
    });

    it('should expose weeks on the child scope', function(){
      $rootScope.today = new Date(2016, 1, 18);
      var contents = '<span>bla</span>';
      var element = $compile('<su-datepicker-month date="today">' + contents + '</su-datepicker-day>')($rootScope);
      $rootScope.$digest();
      var spanElement = angular.element(element.find('span')[0]);
      var childScope = spanElement.scope();
      var weeks = childScope.weeks;

      expect(angular.isArray(weeks)).toBe(true);
      expect(weeks.length).toEqual(5);

      var firstWeek = weeks[0];
      expect(firstWeek.length).toEqual(7);
      expect(firstWeek[0]).not.toBeDefined(); //Sunday is Jan 31 2016
      expect(angular.isDate(firstWeek[1])).toBe(true);
    });
});
