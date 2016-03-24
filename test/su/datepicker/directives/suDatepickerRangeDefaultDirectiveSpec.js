describe('su.datepicker.directives.suDatepickerRangeDefaultDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerRangeDefaultDirective')).toBe(true);
    }));

    it('should blow up if date attribute is not present', function(){
      var element = $compile('<su-datepicker-range-default></su-datepicker-range-default>')($rootScope);
      var thrownException;
      try {
        $rootScope.$digest();
      } catch(exception){
        thrownException = exception;
      }

      expect(thrownException).toEqual('su.datepicker.directives.suDatepickerRangeDefault: start-date attribute is required');
    });

    describe('currentDate', function(){

      it('should expose startDate and nextDate on the scope', function(){
        var today = new Date();
        $rootScope.startDate = undefined;

        var element = $compile('<su-datepicker-range-default start-date="startDate"></su-datepicker-range-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        // should default to today
        expect(angular.isDate(childScope.startDate)).toBe(true);
        expect(childScope.startDate.getFullYear()).toEqual(today.getFullYear());
        expect(childScope.startDate.getMonth()).toEqual(today.getMonth());
        expect(childScope.startDate.getDate()).toEqual(today.getDate());

        expect(angular.isDate(childScope.nextDate)).toBe(true);
        if(childScope.startDate.getMonth() === 11){
          expect(childScope.nextDate.getFullYear()).toBe(childScope.startDate.getFullYear() + 1);
          expect(childScope.nextDate.getMonth()).toBe(1);
        } else {
          expect(childScope.nextDate.getFullYear()).toBe(childScope.startDate.getFullYear());
          expect(childScope.nextDate.getMonth()).toBe(childScope.startDate.getMonth() + 1);
        }
        expect(childScope.nextDate.getDate()).toBe(1);
      });

      it('if startDate is defined set first calendar to start date month and second calendar to following month', function(){
        var someDate = new Date(2016, 11, 22);
        $rootScope.startDate = someDate;

        var element = $compile('<su-datepicker-range-default start-date="startDate"></su-datepicker-range-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(angular.isDate(childScope.startDate)).toBe(true);
        expect(childScope.startDate.getFullYear()).toEqual(someDate.getFullYear());
        expect(childScope.startDate.getMonth()).toEqual(someDate.getMonth());
        expect(childScope.startDate.getDate()).toEqual(someDate.getDate());

        expect(angular.isDate(childScope.nextDate)).toBe(true);
        expect(childScope.nextDate.getFullYear()).toBe(2017);
        expect(childScope.nextDate.getMonth()).toBe(0); //should be next month
        expect(childScope.nextDate.getDate()).toBe(1);
      });

      describe('isDateDisabled', function(){
        it('should expose isDateDisabled', function(){
          $rootScope.date = new Date();
          var element = $compile('<su-datepicker-range-default start-date="date"></su-datepicker-range-default>')($rootScope);
          $rootScope.$digest();
          var childElement = angular.element(element.children()[0]);
          var childScope = childElement.scope();
          expect(typeof childScope.isDateDisabled).toEqual('function');
        });

        it('should return true if date is in the past and disablePast attribute is set', function(){
          var today = new Date();
          var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
          $rootScope.date = today;
          var element = $compile('<su-datepicker-range-default disable-past start-date="date"></su-datepicker-range-default>')($rootScope);
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
          var element = $compile('<su-datepicker-range-default start-date="date"></su-datepicker-range-default>')($rootScope);
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

          var element = $compile('<su-datepicker-range-default start-date="date" is-date-disabled="customDateDisabledCallback(date)"></su-datepicker-range-default>')($rootScope);
          $rootScope.$digest();

          var childElement = angular.element(element.children()[0]);
          var childScope = childElement.scope();

          expect($rootScope.customDateDisabledCallback).toHaveBeenCalledWith(jasmine.any(Date));
        });
      });

      describe('onDateSelect', function(){
        it('should expose onDateSelect which calls parent if invoked', function(){
          var someDate = new Date(2016, 1, 24);
          $rootScope.date = someDate;
          $rootScope.dateSelect = jasmine.createSpy();

          var element = $compile('<su-datepicker-range-default start-date="date" on-date-select="dateSelect(date)"></su-datepicker-range-default>')($rootScope);
          $rootScope.$digest();

          var childElement = angular.element(element.children()[0]);
          var childScope = childElement.scope();

          var selectedDate = new Date();
          childScope.onDateSelect({date: selectedDate});
          var callbackArgs = $rootScope.dateSelect.calls.argsFor(0)[0];
          expect(angular.isDate(callbackArgs)).toBe(true);
          expect(callbackArgs.getFullYear()).toEqual(selectedDate.getFullYear());
          expect(callbackArgs.getMonth()).toEqual(selectedDate.getMonth());
          expect(callbackArgs.getDate()).toEqual(selectedDate.getDate());
        });
      });

      describe('cheapMouseenterCallback', function(){
        it('should expose cheapMouseenterCallback which calls parent if invoked', function(){
          var someDate = new Date(2016, 1, 24);
          $rootScope.date = someDate;
          $rootScope.mouseEnter = jasmine.createSpy();

          var element = $compile('<su-datepicker-range-default start-date="date" cheap-mouseenter-callback="mouseEnter(date)"></su-datepicker-range-default>')($rootScope);
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
      });

      describe('cheapMouseoutCallback', function(){
        it('should expose cheapMouseoutCallback which calls parent if invoked', function(){
          var someDate = new Date(2016, 1, 24);
          $rootScope.date = someDate;
          $rootScope.mouseOut = jasmine.createSpy();

          var element = $compile('<su-datepicker-range-default start-date="date" cheap-mouseout-callback="mouseOut(date)"></su-datepicker-range-default>')($rootScope);
          $rootScope.$digest();

          var childElement = angular.element(element.children()[0]);
          var childScope = childElement.scope();

          var selectedDate = new Date();
          childScope.cheapMouseoutCallback();
          expect($rootScope.mouseOut).toHaveBeenCalled();
        });
      });

      describe('customClass', function(){

        it('should expose custom-class which calls parent if invoked', function(){
          var someDate = new Date(2016, 1, 24);
          $rootScope.date = someDate;
          $rootScope.dateClass = jasmine.createSpy();

          var element = $compile('<su-datepicker-range-default start-date="date" custom-class="dateClass(date)"></su-datepicker-range-default>')($rootScope);
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
      });

      describe('previousMonthDisabled', function(){
        it('should expose previousMonthDisabled which calls parent if invoked', function(){
          var someDate = new Date(2016, 1, 24);
          $rootScope.date = someDate;
          $rootScope.isMonthDisabled = jasmine.createSpy();

          var element = $compile('<su-datepicker-range-default start-date="date" previous-month-disabled="isMonthDisabled(date)"></su-datepicker-range-default>')($rootScope);
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

          var element = $compile('<su-datepicker-range-default start-date="date" next-month-disabled="isMonthDisabled(date)"></su-datepicker-range-default>')($rootScope);
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

          var element = $compile('<su-datepicker-range-default start-date="date"></su-datepicker-range-default>')($rootScope);
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

          var element = $compile('<su-datepicker-range-default start-date="date" header="getHeaderText(date)"></su-datepicker-range-default>')($rootScope);
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

});
