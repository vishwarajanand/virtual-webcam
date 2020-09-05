
const filterSettingKey = "FilterSettingKey";
const default_value = "shader-raw";

function setButtonColor(filterSettingValue) {
    var selectedButtons = document.getElementsByClassName(`btn_filter_select ${filterSettingValue}`);
    if (selectedButtons.length <= 0) {
        document.getElementsByClassName(`btn_filter_select default`)[0].setAttribute("style", "background-color: green;");
    } else {
        selectedButtons[0].setAttribute("style", "background-color: green;");
    }
}

function getUserPrefs() {
    let filterSettingValue = default_value;

    if (chrome.storage) {
        // Get the appropriate shader setting for chrome extensions
        this.filterSettingValue = sessionStorage.getItem(filterSettingKey);

        chrome.storage.sync.get([this.filterSettingKey], function (result) {
            this.filterSettingValue = result.key;
            setButtonColor(this.filterSettingValue);
            console.log('Value currently is ' + result.key);
        });
        console.log(`Got preferred filter : ${this.filterSettingValue}`);
    } else {
        // Get the appropriate shader setting for local web session
        this.filterSettingValue = sessionStorage.getItem(filterSettingKey);
        setButtonColor(this.filterSettingValue);
        console.log(`Got preferred filter : ${this.filterSettingValue}`);
    }
}

function resetVideo() {
    let video = document.getElementById("video");
    if (video) {
        video.remove();
    }
    console.log(`Reset the video preview`);
    // init(); // says init not defined!
    document.location.reload();
}

function setUserPrefs(val) {
    if (chrome.storage) {
        // Set the appropriate shader setting for chrome extensions
        chrome.storage.sync.set({ filterSettingKey: val }, function () {
            console.log('Saved', filterSettingKey, testPrefs);
        });
    } else {
        // Set the appropriate shader setting for local web session
        sessionStorage.setItem(filterSettingKey, val);
        // getUserPrefs();
        console.log(`Set preferred filter to : ${val}`);
        resetVideo();
    }
}
// setUserPrefs(default_value);
getUserPrefs();
