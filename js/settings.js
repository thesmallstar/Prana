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

function showEditScreen() {
    chrome.storage.sync.set(/* String or Array */{ "birthday": null, "expectency": null }, function (data) {
        window.location.reload();
    });
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

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

themeContainer.addEventListener("click", setTheme);
editContainer.addEventListener("click", showEditScreen);