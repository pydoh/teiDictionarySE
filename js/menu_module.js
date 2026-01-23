
//const {
////    app,
////    BrowserWindow,
////    dialog,
//    Menu,
////    MenuItem,
////    ipcMain,
////    MessageChannelMain
//    } = require('electron')

import { Menu } from 'electron';

// Main window menu
export function displayMenu() {

  const template = [
     {
        label: "File",
        role: 'fileMenu',
        submenu: [
           {
              label: "New",
  //            click: () => {
  //                app.quit();
  //            }
  //            role: 'open',
              enabled: false
           },
           {
              label: "Open",
              click: () => {
                  openFile(mainWindow);
              },
  //            role: 'open',
  //            enabled: false
           },
           {
              label: "Save",
              click: () => {
                  saveFile();
              },
  //            role: 'save',
              enabled: false
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

     {
        role: 'help',
  //      role: 'fileMenu',
        submenu: [
           {
              label: 'Learn More',
              enabled: false
           }
        ]
     }
  ]

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
