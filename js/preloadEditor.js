const { ipcRenderer } = require('electron')

// We need to wait until the main world is ready to receive the message before
// sending the port. We create this promise in the preload so it's guaranteed
// to register the onload listener before the load event is fired.
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('edit_port2', async (event) => {
  await windowLoaded
  // We use regular window.postMessage to transfer the port from the isolated
  // world to the main world.
  window.postMessage('edit_port2', '*', event.ports)

//  const xmlid_channel = new MessageChannelMain()
//  const xmlid_port1 = xmlid_channel.port1;
//  const xmlid_port2 = xmlid_channel.port2;
//  ipcRenderer.postMessage('xmlid port', null, [xmlid_port2]);
//  window.postMessage('xmlid_port1', '*', xmlid_port1);
})

ipcRenderer.on('xmlid_port1', async (event) => {
  await windowLoaded
  // We use regular window.postMessage to transfer the port from the isolated
  // world to the main world.
  window.postMessage('xmlid_port1', '*', event.ports)
})
