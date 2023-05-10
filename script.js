
/* Birthday Helpers */
const LEAP_YEAR_MILLISECONDS = 366*1000*24*3600;
const NORMAL_YEAR_MILLISECONDS = 365*1000*24*3600;
const AGE = "age";
const LIFE = "life";

function checkIfLeapYearAndReturnTotalTime(year) {
    if (year % 4 === 0) {
        return LEAPY_YEAR_MILLISECONDS;
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

    if(isBirthdayPassed) {
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
    return ((age/expectency)*100).toFixed(8)+ "%";
}

/* birthday utils end */

/* HTML utils */
function boldDataBeforeDecimalAndAddSubscript(decimalNumber) {
    let number = decimalNumber.toString();
    let index = number.indexOf(".");
    return "<b>" + number.substring(0, index) + "</b><sup>" + number.substring(index) + "</sup>";
}

function boldDataBeforeDecimal(decimalNumber){
    let number = decimalNumber.toString();
    let index = number.indexOf(".");
    return "<b>" + number.substring(0, index) + "</b>" + number.substring(index);
}

const birthday = new Date('05/01/2000');
const expectency = 100;

function setAge() {
    let age = calculateAge(birthday);
    document.getElementById(AGE).innerHTML = boldDataBeforeDecimalAndAddSubscript(age);
    document.getElementById(LIFE).innerHTML =  boldDataBeforeDecimal(getLifePassedPercentage(age, expectency));
}

setAge();
setInterval(setAge, 100);
setTimeout(() => {
    const progress = document.querySelector('.progress-done');
    progress.style.opacity = 1;
    progress.style.width = getLifePassedPercentage(calculateAge(birthday), expectency);
}, 0)

