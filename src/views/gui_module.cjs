// Import required Node modules
const url = require('url')
const path = require("path");

// Import required Electron modules
const {
    BrowserWindow,
    } = require('electron')

// Import required application modules/methods
//const { readData, writeData } = require('./js/file_module.js');

let mainWindow
var promptWindow;
var promptOptions
var promptAnswer;

// Create mainWindow
class createMain {
  constructor() {
    const mainWindow = new BrowserWindow({
      width: 1215,
      height: 800,
      webPreferences: { //        sandbox: true,
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        sandbox: true,
        preload: path.join(__dirname, 'preloadDisplay.js')
      }
    })

    return mainWindow
  };

};

// Create secondaryWindow
class createSecondary {
//  constructor(edit_port2, mainWindow) { // width, height
  constructor(edit_port2, xmlid_port1, mainWindow) { // width, height
    // Write elem to child window.
    const secondaryWindow = new BrowserWindow({
//      parent: mainWindow,
//      modal: true,
//      alwaysOnTop : true,
//      autoHideMenuBar: true,
//      frame: false,
//      fullscreenable: false,
      width: 806,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        sandbox: true,
        preload: path.join(__dirname, 'preloadEditor.js')
      }

    })
    secondaryWindow.autoHideMenuBar;
//    secondaryWindow.webContents.openDevTools()

    secondaryWindow.loadURL(url.format ({
      pathname: path.join(__dirname, '../html/editor.html'), // src/html
      protocol: 'file:',
      slashes: true
    }))

    secondaryWindow.once('ready-to-show', () => {
      // Send editport2 to secondaryWindow
      secondaryWindow.webContents.postMessage('edit_port2', null, [edit_port2]);
      secondaryWindow.webContents.postMessage('xmlid_port1', null, [xmlid_port1]);
    })

    return secondaryWindow
  };

};

// Creating the dialog
class promptModal {
  constructor(filename_port1, parent) {
    const promptWindow = new BrowserWindow({
      parent: parent,
      title : "New file",
      autoHideMenuBar: true,
//       modal: true,
//       alwaysOnTop : true,
//       fullscreenable: false,
//       frame: false,
       width: 360,
       height: 140,
       webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         enableRemoteModule: false,
         sandbox: true,
         preload: path.join(__dirname, 'preloadPrompt.js')
       }

    })

    promptWindow.loadURL(url.format ({
      pathname: path.join(__dirname, '../html/prompt.html'),
      protocol: 'file:',
      slashes: true
    }))

    promptWindow.once('ready-to-show', () => {
      // Send filename_port1 to secondaryWindow
      promptWindow.webContents.postMessage('filename_port1', null, [filename_port1]);
    })

    return promptWindow
  };

};

module.exports = {
  createMain,
  createSecondary,
  promptModal,
  }
