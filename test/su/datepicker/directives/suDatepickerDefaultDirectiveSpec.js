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

    it('should blow up if date attribute is not present', function(){
      var element = $compile('<su-datepicker-default></su-datepicker-default>')($rootScope);
      var thrownException;
      try {
        $rootScope.$digest();
      } catch(exception){
        thrownException = exception;
      }

      expect(thrownException).toEqual('su.datepicker.directives.suDatepickerDefault: date attribute is required');
    });

    it('should be able to use custom template', inject(function($templateCache){
      var templateContents = '<h1>foo</h1>';
      $templateCache.put('customTemplate.html', templateContents);
      $rootScope.today = new Date();
      var element = $compile('<su-datepicker-default template-url="customTemplate.html" date="date"></su-datepicker-default>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toEqual(templateContents);
    }));

    describe('date', function(){
      it('should be exposed on the scope', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(angular.isDate(childScope.date)).toBe(true);
        expect($rootScope.date.getFullYear()).toEqual(childScope.date.getFullYear());
        expect($rootScope.date.getMonth()).toEqual(childScope.date.getMonth());
        expect($rootScope.date.getDate()).toEqual(childScope.date.getDate());
      });
    });

    describe('moveMonth', function(){
      it('should expose moveMonth on the scope', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(typeof childScope.moveMonth).toEqual('function');
      });

      it('should update the month when called', function(){
        $rootScope.date = new Date(2016, 1, 22);
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        childScope.moveMonth(1);
        expect(childScope.date.getFullYear()).toEqual(2016);
        expect(childScope.date.getMonth()).toEqual(2);
        expect(childScope.date.getDate()).toEqual(1);
      });
    });

    describe('isDateDisabled', function(){
      it('should expose isDateDisabled', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(typeof childScope.isDateDisabled).toEqual('function');
      });

      it('should return true if date is in the past and disablePast attribute is set', function(){
        var today = new Date();
        var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        $rootScope.date = today;
        var element = $compile('<su-datepicker-default date="date" disable-past></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(childScope.isDateDisabled(today)).toEqual(false);
        expect(childScope.isDateDisabled(yesterday)).toEqual(true);
      });

      it('should return false if disablePast attribute is not set', function(){
        var today = new Date();
        var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        $rootScope.date = today;
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(childScope.isDateDisabled(today)).toEqual(false);
        expect(childScope.isDateDisabled(yesterday)).toEqual(false);
      });

      it('should support cutom isDateDisabled callback', function(){
        var someDate = new Date(2016, 1, 24);
        var daysInmonth = 29;
        $rootScope.date = someDate;
        $rootScope.customDateDisabledCallback = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" is-date-disabled="customDateDisabledCallback(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect($rootScope.customDateDisabledCallback).toHaveBeenCalledWith(jasmine.any(Date));
      });
    });

    describe('selectDate', function(){
      it('should call the select-date callback', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.dateSelect = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" select-date="dateSelect(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.selectDate({date: selectedDate});
        var callbackArgs = $rootScope.dateSelect.calls.argsFor(0)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
      });
    });

    it('cheap-mouseenter-callback', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.mouseEnter = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" cheap-mouseenter-callback="mouseEnter(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.cheapMouseenterCallback({date: selectedDate});
        var callbackArgs = $rootScope.mouseEnter.calls.argsFor(0)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('cheap-mouseout-callback', function(){
      var someDate = new Date(2016, 1, 24);
      $rootScope.date = someDate;
      $rootScope.mouseout = jasmine.createSpy();

      var element = $compile('<su-datepicker-default date="date" cheap-mouseout-callback="mouseout(date)"></su-datepicker-default>')($rootScope);
      $rootScope.$digest();

      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();

      var selectedDate = new Date();
      childScope.cheapMouseoutCallback({date: selectedDate});
      var callbackArgs = $rootScope.mouseout.calls.argsFor(0)[0];
      expect(angular.isDate(callbackArgs)).toBe(true);
      expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
      expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
      expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    it('should expose custom-class which calls parent if invoked', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.dateClass = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" custom-class="dateClass(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.customClass({date: selectedDate});
        var callbackArgs = $rootScope.dateClass.calls.argsFor($rootScope.dateClass.calls.count() - 1)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
    });

    describe('previousMonthDisabled', function(){
      it('should expose previousMonthDisabled which calls parent if invoked', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.isMonthDisabled = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" previous-month-disabled="isMonthDisabled(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.previousMonthDisabled({date: selectedDate});
        var callbackArgs = $rootScope.isMonthDisabled.calls.argsFor($rootScope.isMonthDisabled.calls.count() - 1)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
      });
    });

    describe('nextMonthDisabled', function(){
      it('should expose nextMonthDisabled which calls parent if invoked', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.isMonthDisabled = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" next-month-disabled="isMonthDisabled(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.nextMonthDisabled({date: selectedDate});
        var callbackArgs = $rootScope.isMonthDisabled.calls.argsFor($rootScope.isMonthDisabled.calls.count() - 1)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
      });
    });

    describe('header', function(){
      it('it should default to 3 letter month and 4 digit year', function(){
        $rootScope.date = undefined;

        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date(2016, 1, 24);
        expect(childScope.header(selectedDate)).toEqual('Feb 2016');
      });

      it('should expose custom-class which calls parent if invoked', function(){
        var someDate = new Date(2016, 1, 24);
        $rootScope.date = someDate;
        $rootScope.getHeaderText = jasmine.createSpy();

        var element = $compile('<su-datepicker-default date="date" header="getHeaderText(date)"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        var selectedDate = new Date();
        childScope.header(selectedDate);
        var lastCallIndex = $rootScope.getHeaderText.calls.count() - 1;
        var callbackArgs = $rootScope.getHeaderText.calls.argsFor(lastCallIndex)[0];
        expect(angular.isDate(callbackArgs)).toBe(true);
        expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
        expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
        expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
      });
    });
});
