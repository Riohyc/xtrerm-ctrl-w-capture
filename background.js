function SendCtrlW() {
  if (document.activeElement.className == "xterm-helper-textarea"){
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {key: "w", keyCode: 87, ctrlKey: true}));
    return true;
  }
  return false;
}

function SendCtrlN() {
  if (document.activeElement.className == "xterm-helper-textarea"){
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {key: "n", keyCode: 78, ctrlKey: true}));
    return true;
  }
  return false;
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'captured') {
    console.log('Ctrl+W shortcut triggered');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      console.log(tabs[0]);
      if (tabs[0].url.indexOf("http") < 0) {
        chrome.tabs.remove(tabs[0].id);
        return;
      }
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: SendCtrlW
      }).then(injectionResult => {
        for (const { result } of injectionResult) {
          if (!result) {
            chrome.tabs.remove(tabs[0].id);
          }
        }
      });
    });
  }
  if (command === 'captured-new-tab') {
    console.log('Ctrl+N shortcut triggered');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      console.log(tabs[0]);
      if (tabs[0].url.indexOf("http") < 0) {
        chrome.tabs.create({ url: "" });
        return;
      }
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: SendCtrlN
      }).then(injectionResult => {
        for (const { result } of injectionResult) {
          if (!result) {
            chrome.tabs.create({ url: "" });
          }
        }
      });
    });
  }
});

