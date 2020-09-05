
const filterSettingKey = "FilterSettingKey";
const default_value = "shader-raw";

function getUserPrefs() {
    let filterSettingValue = sessionStorage.getItem(filterSettingKey);
    console.log(`Got preferred filter : ${filterSettingValue}`);
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
