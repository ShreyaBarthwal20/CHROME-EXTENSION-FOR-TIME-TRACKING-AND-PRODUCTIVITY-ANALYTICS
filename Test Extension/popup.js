document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timeSpent"], (data) => {
        document.getElementById("time").innerText = data.timeSpent || 0;
    });
});