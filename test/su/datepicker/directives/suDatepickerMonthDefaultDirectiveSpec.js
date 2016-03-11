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

    it('should require date', function(){
      var element = $compile('<su-datepicker-month-default></su-datepicker-month-default>')($rootScope);
      var thrownException;
      try {
        $rootScope.$digest();
      } catch(exception){
        thrownException = exception;
      }

      expect(thrownException).toEqual('su.datepicker.directives.suDatepickerMonthDefault: date attribute is required');
    });

    it('should expose clickCallback on the scope', function(){
      $rootScope.date = undefined;
      $rootScope.onDateClick = jasmine.createSpy();
      var element = $compile('<su-datepicker-month-default date="date" click-callback="onDateClick(date)"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.clickCallback({date: selectedDate});
      var callbackArgs = $rootScope.onDateClick.calls.argsFor(0)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('should expose dateDisabled callback on scope', function(){
      $rootScope.date = undefined;
      $rootScope.isDateDisabled = jasmine.createSpy();
      var element = $compile('<su-datepicker-month-default date="date" date-disabled="isDateDisabled(date)"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.dateDisabled({date: selectedDate});
      var lastCallIdx = $rootScope.isDateDisabled.calls.count() - 1;
      var callbackArgs = $rootScope.isDateDisabled.calls.argsFor(lastCallIdx)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('should expose customClass callback on scope', function(){
      $rootScope.date = undefined;
      $rootScope.dateClass = jasmine.createSpy();
      var element = $compile('<su-datepicker-month-default date="date" custom-class="dateClass(date)"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.customClass({date: selectedDate});
      var lastCallIdx = $rootScope.dateClass.calls.count() - 1;
      var callbackArgs = $rootScope.dateClass.calls.argsFor(lastCallIdx)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('should expose cheapMouseenterCallback on scope', function(){
      $rootScope.date = undefined;
      $rootScope.mouseenterCallback = jasmine.createSpy();
      var element = $compile('<su-datepicker-month-default date="date" cheap-mouseenter-callback="mouseenterCallback(date)"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.cheapMouseenterCallback({date: selectedDate});
      var callbackArgs = $rootScope.mouseenterCallback.calls.argsFor(0)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('should expose cheapMouseoutCallback on scope', function(){
      $rootScope.date = undefined;
      $rootScope.mouseoutCallback = jasmine.createSpy();
      var element = $compile('<su-datepicker-month-default date="date" cheap-mouseout-callback="mouseoutCallback(date)"></su-datepicker-month-default>')($rootScope);
      $rootScope.$digest();
      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.cheapMouseoutCallback({date: selectedDate});
      var callbackArgs = $rootScope.mouseoutCallback.calls.argsFor(0)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });
});
