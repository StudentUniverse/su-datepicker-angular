describe('su.datepicker.directives.suDatepickerDateParserDirective', function() {
  beforeEach(module('su.datepicker'));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be defined', inject(function($injector) {
    expect($injector.has('suDatepickerDateParserDirective')).toBe(true);
  }));

  it('should default to ISO', function(){
    $rootScope.date = new Date(2016, 1, 24);
    var element = $compile('<input type="text" ng-model="date" su-datepicker-date-parser/>')($rootScope);
    $rootScope.$digest();
    ngModelController = element.controller('ngModel');
    expect(ngModelController.$viewValue).toEqual('2016-02-24');
  });

  it('should support custom formats', function(){
    $rootScope.date = new Date(2016, 1, 24);
    var element = $compile('<input type="text" ng-model="date" su-datepicker-date-parser="yyyy"/>')($rootScope);
    $rootScope.$digest();
    ngModelController = element.controller('ngModel');
    expect(ngModelController.$viewValue).toEqual('2016');
  });

});
