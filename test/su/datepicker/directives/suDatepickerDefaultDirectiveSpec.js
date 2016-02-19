describe('su.datepicker.directives.suDatepickerDefaultDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerDefaultDirective')).toBe(true);
    }));

    it('should be able to use custom template', inject(function($templateCache){
      var templateContents = '<h1>foo</h1>';
      $templateCache.put('customTemplate.html', templateContents);
      $rootScope.today = new Date();
      var element = $compile('<su-datepicker-default template-url="customTemplate.html" date="date"></su-datepicker-default>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toEqual(templateContents);
    }));

    describe('moveMonth', function(){
      it('should expose moveMonth on the scope', function(){
        $rootScope.today = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(typeof childScope.moveMonth).toEqual('function');
      });

      it('should update the month when called', function(){
        $rootScope.today = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(typeof childScope.moveMonth).toEqual('function');
      });
    });

    it('should expose isDateDisabled', function(){
      $rootScope.today = new Date();
      var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();
      expect(typeof childScope.isDateDisabled).toEqual('function');
    });
});
