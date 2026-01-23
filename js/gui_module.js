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
        preload: path.join(__dirname, 'preloadDisplay.js')
      }
    })

    return mainWindow
  };

};

// Create secondaryWindow
class createSecondary {
  constructor(editport2, mainWindow) { // width, height
    // Write elem to child window.
    const secondaryWindow = new BrowserWindow({
//      parent: mainWindow,
//      modal: true,
//      alwaysOnTop : true,
//      autoHideMenuBar: true,
//      frame: false,
//      fullscreenable: false,
      width: 805,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
//        sandbox: true,
        preload: path.join(__dirname, 'preloadEditor.js')
      }

    })
    secondaryWindow.autoHideMenuBar;

    secondaryWindow.loadURL(url.format ({
      pathname: path.join(__dirname, '../data/html/editor.html'),
      protocol: 'file:',
      slashes: true
    }))

    secondaryWindow.once('ready-to-show', () => {
      // Send editport2 to secondaryWindow
      secondaryWindow.webContents.postMessage('editport2', null, [editport2]);
    })

    return secondaryWindow
  };

};

module.exports = {
  createMain,
  createSecondary,
  }
