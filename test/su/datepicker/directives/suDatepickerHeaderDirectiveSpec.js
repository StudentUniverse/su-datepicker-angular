describe('su.datepicker.directives.suDatepickerHeaderDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerHeaderDirective')).toBe(true);
    }));

    it('should expose header function on the scope', function(){
      $rootScope.getHeader = function(){return 'bla';};
      var element = $compile('<su-datepicker-header header="{{getHeader()}}"></su-datepicker-header>')($rootScope);
      $rootScope.$digest();

      var childElement = angular.element(element.children()[0]);
      var childScope = childElement.scope();
      expect(childScope.header).toEqual('bla');
    });

});
