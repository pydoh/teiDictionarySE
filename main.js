// Import required Node modules
const fs = require("fs");
const url = require('url')
const path = require("path");

// Import required Electron modules
const {
    app,
    BrowserWindow,
    Menu,
//    dialog,
    ipcMain,
    MessageChannelMain
    } = require('electron')

// Import required application modules/methods
const { readData, writeData } = require('./js/fileutils.js');
//const { checkCollision } = require('./js/idutils.js');

// Only pass in a valid defaultPath
const userDocPath = app.getPath('documents');
const parentDirectoryPath = path.join(userDocPath, 'TEI_Dictionaries');
const defaultpath = parentDirectoryPath
const prj_Name = 'Test_lang';

//const defaultpath = path.join(__dirname, 'data')

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
        preload: path.join(__dirname, 'js/preloadDisplay.js')
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
        preload: path.join(__dirname, 'js/preloadEditor.js')
      }

    })
    secondaryWindow.autoHideMenuBar;

    secondaryWindow.loadURL(url.format ({
      pathname: path.join(__dirname, 'data/editor.html'),
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

// Get saveports
function getSavePorts(mainWindow) {
  // set up the channels.
  const savechannel = new MessageChannelMain()
  const saveport1 = savechannel.port1;
  const saveport2 = savechannel.port2;
  mainWindow.webContents.postMessage('saveport2', null, [saveport2])
  saveport1.start();

  return saveport1
};

app.on("before-quit", (event) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => window.destroy());
});

app.whenReady().then(async () => {

  mainWindow = new createMain();
  const saveport1 = getSavePorts(mainWindow);
  const mainmenu = Menu.buildFromTemplate(new createMenu(saveport1));
  Menu.setApplicationMenu(mainmenu);

  // Fixme 'saveport1 Closed!' on new page load
  saveport1.on('message', (event) => {
    entrystring = event.data;
    xml_content = entrystring.replaceAll('&lt;', '<'); // &lt; = <
    xml_content = xml_content.replaceAll('&gt;', '>'); // &gt; = >
    headerFirst = '<?xml version="1.0" encoding="UTF-8"?>\n';
//    headerOldSecond = '<?xml-stylesheet type="text/xsl" href="custom.xsl"?>\n';
    headerSecond = '<?xml-stylesheet type="text/xsl" href="../xsl/custom.xsl"?>\n';
    headerThird = '<!DOCTYPE TEI SYSTEM "z-tei-dictionary.dtd">\n';

    if ( !(xml_content.includes(headerSecond)) ) {
      xml_content = headerFirst + headerSecond + headerThird + xml_content;
    }

    writeData(defaultpath, prj_Name, xml_content);

  })

  // Test for 'saveport1 Closed!'
  saveport1.on('close', (event) => {
    console.log('saveport1 Closed!');
//    const saveport1 = getSavePorts(mainWindow);
//    console.log('saveport1 Opened!');
  })

  ipcMain.on('port', e => {
    const [editport2] = e.ports;
    const secondaryWindow = new createSecondary(editport2, mainWindow);
  })

})

// Main window menu
class createMenu {
  constructor(saveport1) {
    const mainmenu = [
      {
        label: "File",
        role: 'fileMenu',
          submenu: [
            {
              label: "New",
              enabled: false
            },
            {
              label: "Open",
              accelerator: "Ctrl+O",
              click: () => {
                readData(defaultpath, prj_Name, mainWindow);
              },
              enabled: true
            },
            {
              label: "Save",
              accelerator: "Ctrl+S",
              click: () => {
                saveport1.postMessage('xml_content');
              },
              enabled: true
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit',
              accelerator: "Ctrl+Q",
              click: () => {
                app.quit();
              }
            }
          ]
      },
    ]
    return mainmenu
  }
}
