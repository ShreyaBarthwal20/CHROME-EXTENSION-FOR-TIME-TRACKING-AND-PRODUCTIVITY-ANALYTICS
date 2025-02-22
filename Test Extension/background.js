let startTime = null;

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ timeSpent: 0 });
});

chrome.tabs.onActivated.addListener(() => {
    startTime = Date.now();
});

chrome.tabs.onRemoved.addListener(() => {
    if (startTime) {
        let endTime = Date.now();
        let timeSpent = (endTime - startTime) / 1000; // Convert to seconds

        chrome.storage.local.get(["timeSpent"], (data) => {
            let totalTime = (data.timeSpent || 0) + timeSpent;
            chrome.storage.local.set({ timeSpent: totalTime });
        });

        startTime = null;
    }
});

// Log Time Every Minute
chrome.alarms.create("trackTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
    chrome.storage.local.get(["timeSpent"], (data) => {
        console.log("Total Time Spent:", data.timeSpent, "seconds");
    });
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ testKey: "Hello World" }, () => {
        console.log("Data Stored Successfully!");
    });
});