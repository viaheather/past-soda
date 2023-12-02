/**
 * Created by deepak on 1/15/2017.
 */

//region constant variables
var numRegex = /^\d+$/;
var monthArrayList=['January','February','March','April','May','June','July','August','September','October','November','December'];
var dayOfWeekArrayList=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var invalidDateMsg="Invalid Date";
var invalidTimestampOption="Invalid Timestamp Option";
var invalidOperationMsg="Invalid Date Operation";
var invalidDateFormatMsg="Invalid Date Format";
var ISO8601_FORMAT = 'yyyy-MM-dd HH:mm:ss.SSS';
var ISO8601_WITH_TZ_OFFSET_FORMAT = 'yyyy-MM-ddTHH:mm:ss.SSS K';
var DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss.SSS tt';
var DATE_FORMAT = 'yyyy-MM-dd';
var TIME_FORMAT = 'hh:mm:ss tt';
//endregion

var exportFunctions = {
    formatDate: formatDate,
    convertDate: toTimestamp,
    toTimestamp:toTimestamp,
    getYear: getYear,
    getMonth: getMonth,
    getDate: getDate,
    getHours: getHours,
    getMinutes: getMinutes,
    getSeconds: getSeconds,
    getMilliseconds: getMilliseconds,
    getDayOfWeek:getDayOfWeek,
    ISO8601_FORMAT:ISO8601_FORMAT,
    ISO8601_WITH_TZ_OFFSET_FORMAT:ISO8601_WITH_TZ_OFFSET_FORMAT,
    DATETIME_FORMAT:DATETIME_FORMAT,
    DATE_FORMAT:DATE_FORMAT,
    TIME_FORMAT:TIME_FORMAT
};
module.exports = exportFunctions;

//region Helper Function
function appendZero(number, width, lastPosition) {
    var numString = ((number != null && number != undefined) ? number.toString() : "0");
    while (numString.length < width) {
        if (lastPosition == true)
            numString = numString + "0";
        else
            numString = "0" + numString;
    }
    return numString;
}
function validateDate(d, checkValidation) {
    if (checkValidation == true) {
        var dateObj;
        try {
            if (numRegex.test(d) == true && typeof d == 'string')
                d = Number(d);
            dateObj = new Date(d);
            if(dateObj && dateObj.toString().search(/invalid/gi)!=-1)
                return null;
            return dateObj;
        } catch (e) {
            return null;
        }
    }
    else {
        return d;
    }
}
function getYear(d,option,disOption,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj)
        {
            var year=(option=='utc'?dateObj.getUTCFullYear():dateObj.getFullYear()).toString();
            return (disOption=='yy'?year.substr(2,2):year);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function getMonth(d,option,disOption,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var month = (option == 'utc' ? (dateObj.getUTCMonth() + 1) : (dateObj.getMonth() + 1));
            if(disOption=='MMMM')
                return monthArrayList[month-1];
            else if(disOption=='MMM')
                return monthArrayList[month-1].substr(0,3);
            else
                return appendZero(month, 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function getDate(d,option,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var date = (option == 'utc' ? dateObj.getUTCDate(): dateObj.getDate());
            return appendZero(date, 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function get12HoursFormat(hour,disOption)
{
    if(disOption=='12')
        return (hour>12?hour-12:hour);
    return hour;
}


function getHours(d,option,disOption,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var hours = (option == 'utc' ? dateObj.getUTCHours(): dateObj.getHours());
            return appendZero(get12HoursFormat(hours,disOption), 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function getMinutes(d,option,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var minutes = (option == 'utc' ? dateObj.getUTCMinutes(): dateObj.getMinutes());
            return appendZero(minutes, 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}
function getSeconds(d,option,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var seconds = (option == 'utc' ? dateObj.getUTCSeconds(): dateObj.getSeconds());
            return appendZero(seconds, 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}
function getMilliseconds(d,option,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var ms = (option == 'utc' ? dateObj.getUTCMilliseconds(): dateObj.getMilliseconds());
            return appendZero(ms, 3);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function getDayOfWeek(d,option,disOption,checkValid) {
    try{
        var dateObj=validateDate(d,checkValid);
        if(dateObj) {
            var dow = (option == 'utc' ? (dateObj.getUTCDay() + 1) : (dateObj.getDay() + 1));
            if(disOption=='dddd')
                return dayOfWeekArrayList[dow-1];
            else if(disOption=='ddd')
                return dayOfWeekArrayList[dow-1].substr(0,3);
            else
                return appendZero(dow, 2);
        }
        return dateObj;
    }
    catch (e){
        return null;
    }
}

function getAM_PM_Hours(dateObj,format,option)
{
    var hour=(option == 'utc' ? dateObj.getUTCHours(): dateObj.getHours());
    var AM_PM={
        type:"AM",
        hour:appendZero(hour,2)
    };
    if(hour>=12)
    {
        AM_PM.type="PM";
    }
    if(format.indexOf('hh')!=-1)
    {
        AM_PM.hour=appendZero(get12HoursFormat(hour,'12'), 2);
    }
    return AM_PM;
}
function timeOffset(timezoneOffset) {
    var os = Math.abs(timezoneOffset);
    var hour = appendZero((Math.floor(os / 60)),2);
    var minute = appendZero((os % 60),2);
    return (timezoneOffset < 0 ? "+"+hour+minute : "-"+hour+minute);
}

//endregion



function formatDate(dateString, formatStyle,timezoneOffset,validateOutput) {
    try {
        var dateObj = validateDate(dateString, true);
        if (dateObj) {
            if (!timezoneOffset) {
                timezoneOffset = dateObj.getTimezoneOffset();
            }
            else {
                timezoneOffset=0-timezoneOffset;
            }
            if (typeof formatStyle !== 'string') {
                formatStyle = DATETIME_FORMAT;
            }
            dateObj.setUTCMinutes(dateObj.getUTCMinutes() - timezoneOffset);

            var day = getDate(dateObj, 'utc');//dd
            var month = getMonth(dateObj, 'utc'); //MM
            var monthFullName = getMonth(dateObj, 'utc', 'MMMM'); //MONTH
            var monthShortName = getMonth(dateObj, 'utc', 'MMM'); //month
            var fullYear = getYear(dateObj, 'utc');//yyyy
            var shortYear = getYear(dateObj, 'utc', 'yy');
            var hourObj = getAM_PM_Hours(dateObj, formatStyle, 'utc');// hh or HH and tt
            var minute = getMinutes(dateObj, 'utc'); // mm
            var second = getSeconds(dateObj, 'utc'); // ss
            var millisecond = getMilliseconds(dateObj, 'utc');//SSS
            var timeZone = timeOffset(timezoneOffset);//O
            var DOWFullName = getDayOfWeek(dateObj, 'utc', 'dddd');
            var DOWShortName = getDayOfWeek(dateObj, 'utc', 'ddd');

            dateObj.setUTCMinutes(dateObj.getUTCMinutes() + timezoneOffset);

            var formattedString= formatStyle
                .replace(/dddd/g,DOWFullName)
                .replace(/ddd/g,DOWShortName)
                .replace(/dd/g,day)
                .replace(/MMMM/g,monthFullName)
                .replace(/MMM/g,monthShortName)
                .replace(/MM/g,month)
                .replace(/yyyy/g,fullYear)
                .replace(/yy/g,shortYear)
                .replace(/hh/gi,hourObj.hour)
                .replace(/mm/g,minute)
                .replace(/ss/g,second)
                .replace(/SSS/g,millisecond)
                .replace(/tt/g,hourObj.type)
                .replace(/K/g,timeZone);

            if(validateOutput==true)
            {
                var validDate=validateDate(formattedString,true);
                if(!validDate)
                    return invalidDateFormatMsg;
            }
            return formattedString;
        }
        else
            return invalidDateMsg;
    }
    catch (e){
        return invalidOperationMsg;}
}
function toTimestamp(d,option) {

    try {
        if(!option)
            option='ms';
        var dateObj = validateDate(d, true);
        if (dateObj) {
            var timestamp=dateObj.getTime();
            if(option=='sec')
            {
                timestamp=timestamp/1000;
            }
            else if(option!='ms')
            {
                return invalidTimestampOption;
            }
            return Math.round(timestamp);
        }
        else
            return invalidDateMsg;
    }
    catch (e){
        return invalidOperationMsg;}
}
