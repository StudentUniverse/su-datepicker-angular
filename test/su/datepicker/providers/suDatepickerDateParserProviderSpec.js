describe('su.datepicker.providers.suDatepickerDateParserProvider', function(){
    var provider;

    beforeEach(module('su.datepicker', function(suDatepickerDateParserProvider){
        provider = suDatepickerDateParserProvider;
    }));
    beforeEach(inject(function(suDatepickerDateParser){
        //this can be empty, do not delete!
        //service needs to be required for the provider to be injected in
    }));

    it('should be defined', function() {
      expect(provider).toBeDefined();
    });

    it('should have a way to set default format', function(){
      expect(typeof provider.setDefaultDateFormat).toEqual('function');
    });
});
