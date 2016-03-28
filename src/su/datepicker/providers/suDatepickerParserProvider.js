angular.module('su.datepicker.providers.suDatepickerDateParserProvider', [])
  .provider('suDatepickerDateParser', suDatepickerDateParserProvider);

suDatepickerDateParserProvider.$inject = [];
function suDatepickerDateParserProvider(){
  var defaultFormat = 'yyyy-MM-dd';

  function setDefaultDateFormat(format){
    if(angular.isString(format)){
      defaultFormat = format;
    }
  }

  $get.$inject = ['dateFilter'];
  function $get(dateFilter){
    return function(value, format){
      return dateFilter(value, format || defaultFormat);
    };
  }

  return {
    $get: $get,
    setDefaultDateFormat: setDefaultDateFormat
  };
}
