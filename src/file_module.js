// Import required Node modules
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

// Import required Electron modules
import { dialog } from 'electron';

async function ensureTEIDirectory( parentDirectoryPath, projectName ) {
  const directory = join(parentDirectoryPath, projectName)
  try {
    const projDirectoryPath = await mkdir(directory, { recursive: true })
    console.log('Directory created successfully:', projDirectoryPath);
    return projDirectoryPath
  } catch (error) {
    console.error('Directory processing failed:', error.message)
    throw error
  }
}

export function writeData( default_path, prj_Name, xml_content ) {
  const projDirectoryPath = join(default_path, prj_Name);
  var filepath = saveFileDialog(projDirectoryPath, xml_content); // works without ensureTEIDirectory
}

export function loadFile( default_path, prj_Name, mainWindow ) {
  const projDirectoryPath = join(default_path, prj_Name);
  openFileDialog(projDirectoryPath, mainWindow);
}

function openFileDialog( default_path, mainWindow ) {
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
      const filepath = result.filePath;
      saveFile(filepath, xml_content);
    }
  })
  return
}

async function openFile(filePath) {
  try {
    const fileData = await readFile(filePath, 'utf8')
    return fileData
  } catch (error) {
    console.error('Failed to read config file:', error.message)
  }
}

export async function saveFile(filePath, xml_content) {
  try {
    await writeFile(filePath, xml_content, 'utf8')
    console.log('File saved at:', filePath);
  } catch (error) {
    console.error('Failed to save user data:', error.message)
    throw error
  }
}

async function loadConfig() {
  const filePath = join(import.meta.dirname, 'config', 'config.json')
  const fileData = await openFile(filePath)
  const configData = JSON.parse(fileData)
  console.log('Configuration loaded:', configData)
}

async function saveConfig() { // configPath, configData
  const filePath = join(import.meta.dirname, 'config', 'config.json')
  const projectPath = join(import.meta.dirname, 'config')
  const fileData = JSON.stringify({
    projectpath: 'projectPath',
    filepath: 'filePath',
  })
  const configData = JSON.parse(await saveFile(filePath, fileData))
  console.log('Configuration written:', configData)
}

//module.exports = {
//  loadFile,
//  }
