/* Birthday Helpers */
const LEAP_YEAR_MILLISECONDS = 31622400000;
const NORMAL_YEAR_MILLISECONDS = 31536000000;
const AGE = "age";
const LIFE = "life";

function checkIfLeapYearAndReturnTotalTime(year) {
    if (year % 4 === 0) {
        return LEAP_YEAR_MILLISECONDS;
    }
    return NORMAL_YEAR_MILLISECONDS;
}

function checkIfBirthdayHasPassed(day, month) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    if (currentMonth > month) {
        return true;
    } else if (currentMonth === month) {
        if (currentDay > day) {
            return true;
        }
    }
    return false;
}

/**
 * @param {Date} birthday The date to calculate the age from
 */
function calculateAge(birthday) {
    let isBirthdayPassed = checkIfBirthdayHasPassed(birthday.getDate(), birthday.getMonth() + 1)
    let birthdayThisYear = new Date(new Date().getFullYear(), birthday.getMonth(), birthday.getDate());
    let leapTotalTime = checkIfLeapYearAndReturnTotalTime(birthdayThisYear.getFullYear());

    if (isBirthdayPassed) {
        let age = new Date().getFullYear() - birthday.getFullYear();
        let timePassed = (new Date().getTime() - birthdayThisYear.getTime());
        age += timePassed / leapTotalTime;
        return age.toFixed(9);
    } else {
        age = new Date().getFullYear() - birthday.getFullYear() - 1;
        let timePassed = (birthdayThisYear.getTime() - new Date().getTime());
        age += (leapTotalTime - timePassed) / leapTotalTime;
        return age.toFixed(9);
    }
}

function getLifePassedPercentage(age, expectency) {
    return Math.min(100, ((age / expectency) * 100)).toFixed(8) + "%";
}

/* HTML utils */
function boldDataBeforeDecimalAndAddSubscript(decimalNumber) {
    let number = decimalNumber.toString();
    let index = number.indexOf(".");
    return "<b>" + number.substring(0, index) + "</b><sup>" + number.substring(index) + "</sup>";
}

function boldDataBeforeDecimal(decimalNumber) {
    let number = decimalNumber.toString();
    let index = number.indexOf(".");
    return "<b>" + number.substring(0, index) + "</b>" + number.substring(index);
}