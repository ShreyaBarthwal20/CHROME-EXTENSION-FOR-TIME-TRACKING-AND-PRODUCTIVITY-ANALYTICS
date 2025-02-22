let startTime = null;

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ timeSpent: 0 });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (startTime) {
        let endTime = Date.now();
        let timeSpent = (endTime - startTime) / 1000; // Convert to seconds

        chrome.storage.local.get(["timeSpent"], (data) => {
            let totalTime = (data.timeSpent || 0) + timeSpent;
            chrome.storage.local.set({ timeSpent: totalTime });
        });
    }
    startTime = Date.now();
});

// Jab bhi window minimize ho ya dusra tab focus ho
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        if (startTime) {
            let endTime = Date.now();
            let timeSpent = (endTime - startTime) / 1000;

            chrome.storage.local.get(["timeSpent"], (data) => {
                let totalTime = (data.timeSpent || 0) + timeSpent;
                chrome.storage.local.set({ timeSpent: totalTime });
            });

            startTime = null;
        }
    } else {
        startTime = Date.now();
    }
});