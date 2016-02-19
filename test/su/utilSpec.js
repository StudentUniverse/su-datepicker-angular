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

  describe('changeMonth', function(){
    it('should be defined', function(){
      expect(typeof util.changeMonth).toEqual('function');
    });

    it('should return a new instance of Date', function(){
      var today = new Date();
      var copy = util.changeMonth(today, 0);

      expect(angular.isDate(copy)).toBe(true);

      expect(copy.getFullYear()).toEqual(today.getFullYear());
      expect(copy.getMonth()).toEqual(today.getMonth());

      expect(copy.getDate()).toEqual(1);

      expect(copy).not.toBe(today);
    });

    it('should return a date moved by the diff in months', function(){
      var date = new Date(2016, 1, 19);
      var nextMonth = util.changeMonth(date, 1);
      var previousMonth = util.changeMonth(date, -1);

      expect(nextMonth.getFullYear()).toEqual(2016);
      expect(nextMonth.getMonth()).toEqual(2);
      expect(nextMonth.getDate()).toEqual(1);

      expect(previousMonth.getFullYear()).toEqual(2016);
      expect(previousMonth.getMonth()).toEqual(0);
      expect(previousMonth.getDate()).toEqual(1);
    });

    it('should change year if needed', function(){
      var beginingOfYear = new Date(2016, 0, 15);
      var endOfYear = new Date(2016, 11, 16);

      var previousMonth = util.changeMonth(beginingOfYear, -1);
      var nextMonth = util.changeMonth(endOfYear, 1);

      expect(previousMonth.getFullYear()).toEqual(2015);
      expect(previousMonth.getMonth()).toEqual(11);
      expect(previousMonth.getDate()).toEqual(1);

      expect(nextMonth.getFullYear()).toEqual(2017);
      expect(nextMonth.getMonth()).toEqual(0);
      expect(nextMonth.getDate()).toEqual(1);
    });

  });
});
