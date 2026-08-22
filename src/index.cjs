// #!/usr/bin/env node

// Node modules
const path = require('node:path');

// Electron modules
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    MessageChannelMain
    } = require('electron')

/**
    Convert package.json
    "main": "src/index.cjs",
 */

// Application modules
const { loadFile, saveFile } = require('./file_module.js');
const { createMain, createSecondary, promptModal } = require('./views/gui_module.cjs');
const { getSnowflake, addHeader } = require('./text_module.js');
const { parseXml, buildXml, newEntryXml, newPageXml, newFileXml, saveToFile } = require('./xml_module.js');

// Only pass in a valid defaultPath
//const userDocPath = app.getPath('documents');
// const parentDirectoryPath = path.join(userDocPath, 'TEI_Dictionaries');
//const default_path = parentDirectoryPath
const prj_Name = 'Test_lang';

var default_path = path.join(__dirname.split( '/' ).slice( 0, -1 ).join( '/' ), 'data');
// console.log(path.join(__dirname.split( '/' ).slice( 0, -1 ).join( '/' ), 'data'));
var prj_path = path.join(default_path, 'Test_lang');

let mainWindow;

function getSavePorts(mainWindow) {
  let xml_string = event.data;
  let filePath = '';
  const save_channel = new MessageChannelMain()
  const save_port1 = save_channel.port1;
  const save_port2 = save_channel.port2;
  mainWindow.webContents.postMessage('save_port2', null, [save_port2]);
  save_port1.start();
  save_port1.postMessage('xml_content');

  save_port1.on('message', (event) => {
    xml_string = event.data;
    filePath = '';
    parseXml(saveToFile, xml_string, default_path, prj_Name, filePath);
  })

};

function getXmlIdPorts(edit_port2, mainWindow) {
  const xmlid_channel = new MessageChannelMain()
  const xmlid_port1 = xmlid_channel.port1;
  const xmlid_port2 = xmlid_channel.port2;
  xmlid_port2.start();
  const secondaryWindow = new createSecondary(edit_port2, xmlid_port1, mainWindow);

  xmlid_port2.on('message', (event) => {
    var xmlid = getSnowflake();
    xmlid_port2.postMessage(xmlid);
  })

};

function getEntryPorts() { // edit_port2, mainWindow
  const entry_channel = new MessageChannelMain()
  const entry_port1 = entry_channel.port1;
  const entry_port2 = entry_channel.port2;
  entry_port2.start();
  xml_string = newEntryXml();
//   console.log(xml_string);
//   mainWindow.webContents.postMessage('entry_port2', null, [entry_port2]);
//   const secondaryWindow = new createSecondary(edit_port2, xmlid_port1, mainWindow);

//   entry_port2.on('message', (event) => {
// //     var xmlid = getSnowflake();
//     entry_port2.postMessage(entry);
//   })

};

function getFilenamePorts(mainWindow) {
  const filename_channel = new MessageChannelMain()
  const filename_port1 = filename_channel.port1;
  const filename_port2 = filename_channel.port2;
  filename_port2.start();
//   let options = {
// 	    title: "Prompt demo",
// 	    label:"Fill this input field:",
// 	    value:"example",
// // 	    ok: "ok"
// 	    }
  const promptWindow = new promptModal(filename_port1, mainWindow);

  filename_port2.on('message', (event) => {
    var filename = event.data;
    file_string = '/' + filename + '.xml';
    // Fixme {await to load} Warn before overwrite => saveToFile
    filepath = path.join(prj_path, file_string); // not for saveToFile
    xml_string = newFileXml(filename);
//     saveToFile(xml_string, default_path, prj_Name, file_string); // await to load
    saveFile(filepath, xml_string);
    mainWindow.loadFile(filepath); // await to load
  })

//   filename_port2.on('close', (event) => {
//     console.log('filename_port2 closed');
//   })

};

app.on("before-quit", (event) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => window.destroy());
});

app.whenReady().then(async () => {

  mainWindow = new createMain();
  const main_menu = Menu.buildFromTemplate(new createMenu(mainWindow));
  Menu.setApplicationMenu(main_menu);

  const context_menu = Menu.buildFromTemplate([
    {
      label: "New Entry",
      accelerator: "Ctrl+E",
      click: () => {
        getEntryPorts(); // mainWindow
      },
      enabled: true
    },
    {
      label: "Entry Before",
      accelerator: "Ctrl+B",
//       click: () => {
//         getFilenamePorts(mainWindow);
//       },
      enabled: true
    },
    {
      label: "Entry After",
      accelerator: "Ctrl+A",
//       click: () => {
//         getFilenamePorts(mainWindow);
//       },
      enabled: true
    },
//     { role: 'copy' },
//     { role: 'cut' },
//     { role: 'paste' },
//     { role: 'selectall' }
  ])
  mainWindow.webContents.on('context-menu', (_event, params) => {
//       console.log(params);
    // only show the context menu if the element is editable
//     if (params.isEditable) {
      context_menu.popup()
//     }
  })

  ipcMain.on('edit port', e => {
    const [edit_port2] = e.ports;
    getXmlIdPorts(edit_port2, mainWindow);
  })

})

class createMenu {
  constructor(mainWindow) {
    const main_menu = [
      {
        label: "File",
        role: 'fileMenu',
          submenu: [
            {
              label: "New",
              accelerator: "Ctrl+N",
              click: () => {
                getFilenamePorts(mainWindow);
              },
              enabled: true
            },
            {
              label: "Open",
              accelerator: "Ctrl+O",
              click: () => {
                loadFile(default_path, prj_Name, mainWindow);
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
