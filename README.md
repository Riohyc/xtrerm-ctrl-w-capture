# xterm-ctrl-w-capture

A chrome extension used to solve Ctrl+W conflict when people use modern browser and the web page provide a web trerminal base on xterm.js

Ctrl+W has different usage in browser and terminal: 
- Browser: Close current tab
- Terminal(shell/bash): Removes the command/argument before the cursor

But browser shortcut always is in first order and cannot be changed or disabled easilly which caused people always close the tab accidentally when they just want to remove the previous command!

## How it work
This extension can "capture" original **Ctrl+W** `KeybowrdEvent` by provide a configurable extension shourcut which should be configure to **Ctrl+W**. Then extension
will triggerd by shortcut and send another new `KeybowrdEvent` to xterm element in current tab page.

## How to use
1. Install this extension
2. Go to `edge://extensions/shortcuts` or `chrome://extensions/shortcuts` and find this extension
3. Configure **Capture ctrl+w** shortcut to **Ctrl+W**
