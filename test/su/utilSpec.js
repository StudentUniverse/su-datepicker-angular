describe('util', function(){

  it('should be defined', function(){
    expect(util).toBeDefined();
  });

  describe('getDaysInMonth', function(){
    it('should return the correct number of days in a month', function(){
      expect(getDaysInMonth(2016, 2)).toEqual(29);
      expect(getDaysInMonth(2016, 3)).toEqual(31);
      expect(getDaysInMonth(2016, 4)).toEqual(30);
      expect(getDaysInMonth(2017, 2)).toEqual(28);
    });
  });

  describe('getMonthDates', function(){
    it('should be defined', function(){
      expect(typeof util.getMonthDates).toEqual('function');
    });

    it('should should return an arry of Dates for every day in a month', function(){
      var daysInFeb16 = util.getMonthDates(2016, 1);
      expect(angular.isArray(daysInFeb16)).toBe(true);
      expect(daysInFeb16.length).toEqual(29);

      var firstDay = daysInFeb16[0];
      expect(angular.isDate(firstDay)).toEqual(true);
      expect(firstDay.getFullYear()).toEqual(2016);
      expect(firstDay.getMonth()).toEqual(1);
      expect(firstDay.getDate()).toEqual(1);
    });
  });

  describe('copyDateOnly', function(){
    it('should be defined', function(){
      expect(typeof util.copyDateOnly).toEqual('function');
    });

    it('should return a new instance of a date without time', function(){
      var today = new Date();
      var copy = util.copyDateOnly(today);

      expect(copy.getHours()).toEqual(0);
      expect(copy.getSeconds()).toEqual(0);
      expect(copy.getMinutes()).toEqual(0);
      expect(copy.getMilliseconds()).toEqual(0);

      expect(copy.getFullYear()).toEqual(today.getFullYear());
      expect(copy.getMonth()).toEqual(today.getMonth());
      expect(copy.getDate()).toEqual(today.getDate());

      expect(copy).not.toBe(today);
    });
  });
});
