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
    console.log('Directory already exists:', projDirectoryPath);
    return projDirectoryPath
  }
//  return projDirectoryPath
}

export function writeData( default_path, prj_Name, xml_content, filePath ) {
  default_path = ensureTEIDirectory(default_path, prj_Name);
  var default_path = default_path + filePath;
  var filepath = saveFileDialog(default_path, xml_content); // works without ensureTEIDirectory
  return filepath
//  const filePath = path.join(default_path, filepath);
//  ensureFileExistence(filePath);
//  Fixme const timestamp = Date.now().toString(); // Git integration???
}

// Read data from a file
export function readData( defaultpath, prj_Name, mainWindow ) {
  defaultpath = ensureTEIDirectory(defaultpath, prj_Name);
  openFile(defaultpath, mainWindow);
}

//  Open file dialog
function openFile( default_path, mainWindow ) {
//  Invalid mime.cache file does not contain null prior to ALIAS_LIST_OFFSET=44 ////////////
  dialog.showOpenDialog({
    title: 'Open file',
    defaultPath: default_path,
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
function saveFileDialog( default_path, xml_content ) {
  dialog.showSaveDialog({
    title: 'Save file',
    defaultPath: default_path,
    buttonLabel: 'Save',
    filters: [
      { name: 'Xml Files', extensions: ['xml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled) {
      // Use result.filePath to save the file
      const filepath = result.filePath;
      saveFile(filepath, xml_content);

//      try {
//        fs.writeFileSync(filepath, xml_content, 'utf-8');
//        console.log('File saved at:', result.filePath);
//        return result.filePath
//      } catch (err) {
//        console.error('Error saving file:', err);
//      }

    }
  })
  return
}

export function saveFile(filepath, xml_content) {
  try {
    fs.writeFileSync(filepath, xml_content, 'utf-8');
    console.log('File saved at:', filepath);
    return filepath
  } catch (err) {
    console.error('Error saving file:', err);
  }
}

//module.exports = {
//  readData,
//  writeData,
//  }
