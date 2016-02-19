describe('su.datepicker.directives.suDatepickerMonthDefaultDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerMonthDefaultDirective')).toBe(true);
    }));

    it('should be able to use custom template', inject(function($templateCache){
      var templateContents = '<h1>foo</h1>';
      $templateCache.put('customTemplate.html', templateContents);
      $rootScope.today = new Date();
      var element = $compile('<su-datepicker-month-default template-url="customTemplate.html" date="date"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toEqual(templateContents);
    }));
});
