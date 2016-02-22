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

    describe('currentDate', function(){
      it('should be exposed on the scope', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();
        expect(angular.isDate(childScope.currentDate)).toBe(true);
        expect($rootScope.date.getFullYear()).toEqual(childScope.currentDate.getFullYear());
        expect($rootScope.date.getMonth()).toEqual(childScope.currentDate.getMonth());
        expect($rootScope.date.getDate()).toEqual(childScope.currentDate.getDate());
      });

      it('should not affect scope date', function(){
        $rootScope.date = new Date(2016, 1, 22);
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect($rootScope.date.getFullYear()).toEqual(childScope.currentDate.getFullYear());
        expect($rootScope.date.getMonth()).toEqual(childScope.currentDate.getMonth());
        expect($rootScope.date.getDate()).toEqual(childScope.currentDate.getDate());

        childScope.currentDate = new Date(2017, 2, 10);
        $rootScope.$digest();

        expect($rootScope.date.getFullYear()).toEqual(2016);
        expect($rootScope.date.getMonth()).toEqual(1);
        expect($rootScope.date.getDate()).toEqual(22);

        expect(childScope.currentDate.getFullYear()).toEqual(2017);
        expect(childScope.currentDate.getMonth()).toEqual(2);
        expect(childScope.currentDate.getDate()).toEqual(10);
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
        expect(childScope.currentDate.getFullYear()).toEqual(2016);
        expect(childScope.currentDate.getMonth()).toEqual(2);
        expect(childScope.currentDate.getDate()).toEqual(1);
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
    });

    describe('selectDate', function(){
      it('should set the date to the passed in date', function(){
        $rootScope.today = new Date();
        var tomorow = new Date($rootScope.today.getFullYear(), $rootScope.today.getMonth(), $rootScope.today.getDate() + 1);
        var element = $compile('<su-datepicker-default date="today"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();
        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(typeof childScope.selectDate).toEqual('function');

        childScope.selectDate(tomorow);
        $rootScope.$digest();

        expect($rootScope.today.getFullYear()).toEqual(tomorow.getFullYear());
        expect($rootScope.today.getMonth()).toEqual(tomorow.getMonth());
        expect($rootScope.today.getDate()).toEqual(tomorow.getDate());
      });
    });

    describe('setPotentialDate', function(){
      it('should be available to child scope', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(typeof childScope.setPotentialDate).toEqual('function');
      });

      it('should trigger scope $digest', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        scopeSpy = spyOn(childScope, '$digest');
        childScope.setPotentialDate(new Date());
        expect(scopeSpy).toHaveBeenCalled();
      });
    });

    describe('getDateClass', function(){
      it('should be available to child scope', function(){
        $rootScope.date = new Date();
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(typeof childScope.getDateClass).toEqual('function');
      });

      it('should return "active-date" if the passed in date matches the scope date', function(){
        $rootScope.date = new Date();
        var dateCopy = new Date($rootScope.date.getFullYear(), $rootScope.date.getMonth(), $rootScope.date.getDate());
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        expect(childScope.getDateClass(dateCopy)).toEqual('active-date');
      });

      it('should return "potential-date" if the passed in date does not match scope date but matches potential date', function(){
        $rootScope.date = new Date();
        var dateCopy = new Date($rootScope.date.getFullYear(), $rootScope.date.getMonth(), $rootScope.date.getDate() + 1);
        var element = $compile('<su-datepicker-default date="date"></su-datepicker-default>')($rootScope);
        $rootScope.$digest();

        var childElement = angular.element(element.children()[0]);
        var childScope = childElement.scope();

        childScope.setPotentialDate(dateCopy);
        expect(childScope.getDateClass(dateCopy)).toEqual('potential-date');
      });
    });
});
