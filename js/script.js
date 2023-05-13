
/* Birthday Helpers */
const LEAP_YEAR_MILLISECONDS = 366 * 1000 * 24 * 3600;
const NORMAL_YEAR_MILLISECONDS = 365 * 1000 * 24 * 3600;
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
    return ((age / expectency) * 100).toFixed(8) + "%";
}

/* birthday utils end */

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

let birthday = new Date('05/01/2000');
let expectency = 100;

function setAge() {
    let age = calculateAge(birthday);
    document.getElementById(AGE).innerHTML = boldDataBeforeDecimalAndAddSubscript(age);
    document.getElementById(LIFE).innerHTML = boldDataBeforeDecimal(getLifePassedPercentage(age, expectency));
}

function loadAgeView() {

    var element = document.getElementById('input-box');
    element.remove();

    setAge();
    setInterval(setAge, 100);
    setTimeout(() => {
        const progress = document.querySelector('.progress-done');
        progress.style.opacity = 1;
        progress.style.width = getLifePassedPercentage(calculateAge(birthday), expectency);
    }, 100)
}

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target; // get the form element
    const formData = new FormData(form); // create a FormData object from the form data
    // iterate over the FormData entries and log them to the console
    for (let [name, value] of formData) {
        chrome.storage.sync.set({ [name]: value }, function () { });
        console.log(name, value)
    }

    window.location.reload();
}


function showInputScreen() {
    document.getElementById("input-form").style.display = "block";
}

function showEditScreen() {
    chrome.storage.sync.set(/* String or Array */{ "birthday": null, "expectency": null }, function (data) {
        window.location.reload();
    });
}

function main() {
    var element = document.getElementById('data-box');
    element.remove();
    chrome.storage.sync.get(/* String or Array */["birthday", "expectency"], function (data) {
        birthday = new Date(data.birthday);
        expectency = data.expectency;
        if (data.birthday == null) {
            showInputScreen();
        } else {
            document.getElementsByClassName("main-box")[0].appendChild(element);
            birthday = new Date(data.birthday);
            expectency = data.expectency;
            loadAgeView();
        }
    });

}

const sun = "../svg/sun.svg";
const moon = "../svg/moon.svg";
const editLight = "../svg/edit_white.svg";
const editDark = "../svg/edit_black.svg";

const themeContainer = document.getElementsByClassName("theme-container")[0];
const editContainer = document.getElementsByClassName("edit-container")[0];
const themeIcon = document.getElementById("theme-icon");
const editIcon = document.getElementById("edit-icon");

function applyDarkOrLightMode(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementsByClassName("main-box")[0].classList.add("dark-mode");
        document.getElementsByClassName("progress")[0].classList.add("dark-mode");
        document.getElementById("age").classList.add("dark-mode");
        document.getElementById("life").classList.add("dark-mode");
        document.getElementsByClassName("line")[0].classList.add("dark-mode");

    } else {
        document.body.classList.remove("dark-mode");
        document.getElementsByClassName("main-box")[0].classList.remove("dark-mode");
        document.getElementsByClassName("progress")[0].classList.remove("dark-mode");
        document.getElementById("age").classList.remove("dark-mode");
        document.getElementById("life").classList.remove("dark-mode");
        document.getElementsByClassName("line")[0].classList.remove("dark-mode");
    }
}


function setTheme() {
    chrome.storage.sync.get(/* String or Array */["darkMode"], function (data) {
        if (data.darkMode) {
            setLight(true);
        }
        else {
            setDark(true);
        }
    });
}

function setLight(animationRequried) {
    themeContainer.classList.remove("shadow-dark");
    setTimeout(() => {
        themeContainer.classList.add("shadow-light");
        themeIcon.classList.remove("change");
    }, 300);

    if (animationRequried) {
        themeIcon.classList.add("change");
    }
    themeIcon.src = sun;
    editIcon.src = editDark;

    chrome.storage.sync.set(/* String or Array */{ "darkMode": false }, function (data) { });
    applyDarkOrLightMode("light");
}

function setDark(animationRequried) {
    setTimeout(() => {
        themeContainer.classList.add("shadow-dark");
        themeIcon.classList.remove("change");
    }, 300);

    if (animationRequried) {
        themeIcon.classList.add("change");
    }
    themeIcon.src = moon;
    editIcon.src = editLight;

    chrome.storage.sync.set(/* String or Array */{ "darkMode": true }, function (data) { });
    applyDarkOrLightMode("dark");
}

window.onload = (event) => {
    main();
    chrome.storage.sync.get(/* String or Array */["darkMode"], function (data) {
        if (data.darkMode) {
            setDark(false);
        } else {
            setLight(false);
        }
    });
};

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
themeContainer.addEventListener("click", setTheme);
editContainer.addEventListener("click", showEditScreen);
