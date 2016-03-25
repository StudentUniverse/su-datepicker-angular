describe('su.datepicker.directives.suDatepickerChangeButtonDirective', function(){
    beforeEach(module('su.datepicker'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', inject(function($injector) {
      expect($injector.has('suDatepickerChangeButtonDirective')).toBe(true);
    }));

    it('should blow up if type is not specified', function(){
      var element = $compile('<su-datepicker-change-button></su-datepicker-change-button>')($rootScope);
      var thrownException;
      try {
        $rootScope.$digest();
      } catch(exception){
        thrownException = exception;
      }

      expect(thrownException).toEqual('su.datepicker.directives.suDatepickerChangeButtonDirective: must specify type of next or previous');
    });

});
