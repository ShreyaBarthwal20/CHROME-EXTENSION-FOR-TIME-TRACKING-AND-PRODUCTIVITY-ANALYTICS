document.addEventListener("DOMContentLoaded", () => {
    function updateTime() {
        chrome.storage.local.get(["timeSpent"], (data) => {
            document.getElementById("time").innerText = data.timeSpent || 0;
        });
    }

    updateTime();
    setInterval(updateTime, 1000); // Refresh every second
});