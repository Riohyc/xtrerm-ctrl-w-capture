function SendKeyboradEvent() {
  if (document.activeElement.className == "xterm-helper-textarea"){
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {key: "w", keyCode: 87, ctrlKey: true}));
    return true;
  }
  return false;
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'captured') {
    console.log('Ctrl+W shortcut triggered');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0].url.indexOf("chrome://") === 0) {
        chrome.tabs.remove(tabs[0].id);
        return;
      }
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: SendKeyboradEvent
      }).then(injectionResult => {
        for (const { result } of injectionResult) {
          if (!result) {
            chrome.tabs.remove(tabs[0].id);
          }
        }
      });
    });
  }
});

