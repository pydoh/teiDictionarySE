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
      pathname: path.join(__dirname, '../data/html/editor.html'),
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

module.exports = {
  createMain,
  createSecondary,
  }
