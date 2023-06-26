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
  let xtermTextareas = document.getElementsByClassName("xterm-helper-textarea");
  if(xtermTextareas.length > 0){
    xtermTextareas[0].dispatchEvent(new KeyboardEvent("keydown", {key: "w", keyCode: 87, ctrlKey: true}));
  }
}