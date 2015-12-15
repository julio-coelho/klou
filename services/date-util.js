'use strict';

var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

exports.getDaysInMonth = function (year, month) {
  if (month === 1) {
    return isLeapYear(year) ? 29 : 28;
  }
  return daysInMonth[month];
};

exports.isLeapYear = function (year) {
 if (year % 400 == 0) return true;
 if (year % 100 == 0) return false;
 if (year % 4 == 0)   return true;
                      return false;
};
