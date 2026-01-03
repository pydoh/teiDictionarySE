// Import required Node modules
import * as  fs from 'fs';
import * as path from 'path';

// Import required Electron modules
import { dialog } from 'electron';

function ensureTEIDirectory( parentDirectoryPath, prj_Name ) {
  const projDirectoryPath = path.join(parentDirectoryPath, prj_Name);
  if (!fs.existsSync(projDirectoryPath)) {
    fs.mkdirSync(projDirectoryPath, { recursive: true });
    console.log('Directory created successfully:', projDirectoryPath);
  } else {
//    console.log('Directory already exists:', projDirectoryPath);
    return
  }
  return projDirectoryPath
}

export function writeData( defaultpath, prj_Name, xml_content ) {
  defaultpath = ensureTEIDirectory(defaultpath, prj_Name);
  saveFile(defaultpath, xml_content);
//  const filePath = path.join(defaultpath, filepath);
//  ensureFileExistence(filePath);
//  Fixme const timestamp = Date.now().toString(); // Git integration???
}

// Read data from a file
export function readData( defaultpath, prj_Name, mainWindow ) {
  defaultpath = ensureTEIDirectory(defaultpath, prj_Name);
  openFile(defaultpath, mainWindow);
}

//  Open file dialog
function openFile( defaultpath, mainWindow ) {
//  Invalid mime.cache file does not contain null prior to ALIAS_LIST_OFFSET=44 ////////////
  dialog.showOpenDialog({
    title: 'Open file',
    defaultPath: defaultpath,
    buttonLabel: 'Open',
    filters: [
      { name: 'Xml Files', extensions: ['xml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
    }).then(result => {
      if (!result.canceled) {
          const filepath = result.filePaths[0];
          mainWindow.loadFile(filepath);
      }
  }).catch(err => {
      console.log(err);
  });
//  Invalid mime.cache file does not contain null prior to ALIAS_LIST_OFFSET=44 ////////////
};

// Save file dialog
function saveFile( defaultpath, xml_content ) {
  dialog.showSaveDialog({
    title: 'Save file',
    defaultPath: defaultpath,
    buttonLabel: 'Save',
    filters: [
      { name: 'Xml Files', extensions: ['xml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled) {
      // Use result.filePath to save the file
      const filepath = result.filePath;

      try {
        fs.writeFileSync(filepath, xml_content, 'utf-8');
        // file written successfully
        console.log('File saved at:', result.filePath);
      } catch (err) {
        console.error('Error saving file:', err);
      }

    }
  })
  return
}

//module.exports = {
//  readData,
//  writeData,
//  }
