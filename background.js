chrome.commands.onCommand.addListener(function(command) {
  if (command === 'captured') {
    console.log('Ctrl+W shortcut triggered');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: SendKeyboradEvent
      });
    });
  }
});

function SendKeyboradEvent(){
  if (document.activeElement.className == "xterm-helper-textarea"){
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", {key: "w", keyCode: 87, ctrlKey: true}));
  }
}