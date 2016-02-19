describe('su.datepicker.filters.suDatepickerMonthText', function(){
    beforeEach(module('su.datepicker'));

    var filter;

    beforeEach( inject(function($filter) {
        filter = $filter('suDatepickerMonthText');
    }));

    it('should be able to load', inject(function($injector){
        expect($injector.has('suTimeNeutralDateCompareFilter')).toBe(true);
    }));

    it('should return a string', function(){
      expect(filter(0)).toEqual('Jan');
      expect(filter(1)).toEqual('Feb');
      expect(filter(2)).toEqual('Mar');
      expect(filter(3)).toEqual('Apr');
      expect(filter(4)).toEqual('May');
      expect(filter(5)).toEqual('Jun');
      expect(filter(6)).toEqual('Jul');
      expect(filter(7)).toEqual('Aug');
      expect(filter(8)).toEqual('Sep');
      expect(filter(9)).toEqual('Oct');
      expect(filter(10)).toEqual('Nov');
      expect(filter(11)).toEqual('Dec');
    });
});
