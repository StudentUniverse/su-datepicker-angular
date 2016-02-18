describe('su.datepicker.filters.suTimeNeutralDateCompareFilter', function(){
    beforeEach(module('su.datepicker'));

    var filter;

    beforeEach( inject(function($filter) {
        filter = $filter('suTimeNeutralDateCompare');
    }));

    // must use inject to run config/run of module
    it('should be able to load', inject(function($injector){
        expect($injector.has('suTimeNeutralDateCompareFilter')).toBe(true);
    }));

    it('should return -1 when first date is less than second', function(){
      var date1 = new Date(2016, 1, 15, 0, 0, 0, 0);
      var date2 = new Date(2016, 1, 16, 0, 0, 0, 0);
      expect(filter(date1, date2)).toEqual(-1);
    });

    it('should return 0 when the dates are the same', function(){
      var date1 = new Date();
      var date2 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      expect(filter(date1, date2)).toEqual(0);
    });

    it('should return 1 first date is greater than second', function(){
      var date1 = new Date();
      var date2 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() - 1);
    });
});
