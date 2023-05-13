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

function showInputScreen() {
    document.getElementById("input-form").style.display = "block";
    document.getElementsByClassName("main-box")[0].classList.add("is-input-page");
    document.getElementById("footer-text").classList.add("is-input-page");
    document.getElementById("about-me").style.display = "block";
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


