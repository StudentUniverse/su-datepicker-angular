var util = {
  getMonthDates: getMonthDates,
  copyDateOnly: copyDateOnly
};

// month is inclussive(0-11)
function getMonthDates(year, month){
  var days = [];
  if(typeof year === 'number' && typeof month === 'number'){
        var daysInMonth = getDaysInMonth(year, month + 1);

    for(var i = 1; i <= daysInMonth; i++){
      days.push(new Date(year, month, i));
    }
  }
  return days;
}

function copyDateOnly(date){
  var copy = new Date(date);
  copy.setHours(0,0,0,0);
  return copy;
}

// month is exclussive(1-12)
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
