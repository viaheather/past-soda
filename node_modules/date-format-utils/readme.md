**Installation :**
```
$ npm install date-format-utils
```
**Usages :**
```
var dateUtil = require('date-format-utils');

// formatDate(Date,FormatStyle,Timezone);
// Date => 'Timestamp ,date object or valid date string'
// FormatStyle => 'Format string, e.g. `yyyy-MM-dd HH:mm:ss.SSS`'
// Timezone => 'Timezone of date [Optional]'

dateUtil.formatDate(new Date()); // Default to format 'yyyy-MM-dd hh:mm:ss.SSS tt'
dateUtil.formatDate(new Date(),'yyyy-MM-dd'); // Show date
dateUtil.formatDate(new Date(),'hh:mm:ss tt',480); // Show time [Specify Timezone]

// You can convert a date into timestamp using toTimestamp(Date,Option)
// Date => 'date object or valid date string'
// Option => 'timestamp option [timestamp in sec,timestamp in millisecond]
// Default option is millisecond

dateUtil.toTimestamp(new Date()); //Show timestamp in milliseconds [Default]
dateUtil.toTimestamp(new Date(),'ms'); //Show timestamp in milliseconds
dateUtil.toTimestamp(new Date(),'sec'); //Show timestamp in sec
```                
**The following describes the custom date and time format specifiers :**
>* "dd"   : The day of the month, from 01 through 31.
>* "ddd"  : The abbreviated name of the day of the week.
>* "dddd" : The full name of the day of the week.
>* "MM"   : The month, from 01 through 12.
>* "MMM"  : The abbreviated name of the month.
>* "MMMM" : The full name of the month.
>* "yy"   : The year, from 00 to 99.
>* "yyyy" : The year as a four-digit number.
>* "hh"   : The hour, using a 12-hour clock from 01 to 12.
>* "HH"   : The hour, using a 24-hour clock from 00 to 23.
>* "mm"   : The minute, from 00 through 59.
>* "ss"   : The second, from 00 through 59.
>* "SSS"  : The milliseconds in a date and time value.
>* "tt"   : The AM/PM designator.
>* "K"    : Time zone information.

**Basic Example :**
```
var dateUtil = require('date-format-utils');
var date = new Date('1/18/2017, 1:30:00 PM');
console.log(dateUtil.formatDate(date,dateUtil.ISO8601_FORMAT,330));
console.log(dateUtil.formatDate(date,dateUtil.ISO8601_WITH_TZ_OFFSET_FORMAT,330));
console.log(dateUtil.formatDate(date,dateUtil.DATETIME_FORMAT,330));
console.log(dateUtil.formatDate(date,dateUtil.DATE_FORMAT,330));
console.log(dateUtil.formatDate(date,dateUtil.TIME_FORMAT,330));

console.log(dateUtil.toTimestamp(date));
console.log(dateUtil.toTimestamp(date,'ms'));
console.log(dateUtil.toTimestamp(date,'sec'));
console.log(dateUtil.toTimestamp(date,'xyz'));

// The example displays the following output:
//      2017-01-18 13:30:00.000
//      2017-01-18T13:30:00.000 +0530
//      2017-01-18 01:30:00.000 PM
//      2017-01-18
//      01:30:00 PM

//      1484726400000
//      1484726400000
//      1484726400
//      Invalid Timestamp Option

```