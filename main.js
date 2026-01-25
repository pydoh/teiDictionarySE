// Import required Node modules
const path = require("path");
//const { randomUUID } = require('crypto');

// Import required Electron modules
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    MessageChannelMain
    } = require('electron')

// Import required application modules/methods
const { readData, writeData } = require('./js/file_module.js');
const { createMain, createSecondary } = require('./js/gui_module.js');
const { getSnowflake } = require('./js/id_module.js');

// Only pass in a valid defaultPath
//const userDocPath = app.getPath('documents');
//const parentDirectoryPath = path.join(userDocPath, 'TEI_Dictionaries');
//const defaultpath = parentDirectoryPath
const prj_Name = 'Test_lang';

const defaultpath = path.join(__dirname, 'data')

let mainWindow

// Get saveports
function getSavePorts(mainWindow) {
  // set up the channels.
  const save_channel = new MessageChannelMain()
  const save_port1 = save_channel.port1;
  const save_port2 = save_channel.port2;
  mainWindow.webContents.postMessage('save_port2', null, [save_port2])
  save_port1.start();
  save_port1.postMessage('xml_content');

  save_port1.on('message', (event) => {
    entrystring = event.data;
    saveXml(entrystring);
  })

  // Test for 'save_port1 Closed!'
  save_port1.on('close', (event) => {
    console.log('save_port1 Closed!');
  })

};

// Get saveports
function saveXml(entrystring) {
  // set up the channels.
  xml_content = entrystring.replaceAll('&lt;', '<'); // &lt; = <
  xml_content = xml_content.replaceAll('&gt;', '>'); // &gt; = >
  headerFirst = '<?xml version="1.0" encoding="UTF-8"?>\n';
  headerSecond = '<?xml-stylesheet type="text/xsl" href="xsl/custom.xsl"?>\n';
  headerThird = '<!DOCTYPE TEI SYSTEM "z-tei-dictionary.dtd">\n';

  if ( !(xml_content.includes(headerSecond)) ) {
    xml_content = headerFirst + headerSecond + headerThird + xml_content;
  }

  writeData(defaultpath, prj_Name, xml_content);

};

app.on("before-quit", (event) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => window.destroy());
});

app.whenReady().then(async () => {

  mainWindow = new createMain();
  const main_menu = Menu.buildFromTemplate(new createMenu(mainWindow));
  Menu.setApplicationMenu(main_menu);
  getSnowflake();

  ipcMain.on('edit port', e => {
    const [edit_port2] = e.ports;
    const secondaryWindow = new createSecondary(edit_port2, mainWindow);
  })

})

// Main window menu
class createMenu {
  constructor(mainWindow) {
    const main_menu = [
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
                getSavePorts(mainWindow);
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
    return main_menu
  }
}
