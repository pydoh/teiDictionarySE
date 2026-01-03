const { ipcRenderer } = require('electron')

ipcRenderer.on('ctrlport2', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0]
  ctrlport2 = window.electronMessagePort
//  ctrlport2.postMessage('ping')

  ctrlport2.onmessage = messageEvent => {
    // handle message
    alert(messageEvent.data);
  }

})

ipcRenderer.on('editport1', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0]
  editport1 = window.electronMessagePort
//  editport1.postMessage('ping')

  editport1.onmessage = onMessage;

})

// Handle messages received on port1
function onMessage(messageEvent) {
//  editport1.postMessage('ping')
  alert(messageEvent.data);
}

// -> Custom javascript --------------------------------------------------------------------------
// DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  // EventListener for element click
  document.addEventListener('click', elemClick);
});

// Handle messages received on port1
function elemClick(e) {
  var elem = e.target.closest('entry').outerHTML;
  // Listen for messages on port1
  editport1.postMessage(elem);
  ctrlport2.postMessage('message');
}
// -> Custom javascript --------------------------------------------------------------------------

////const { MessageChannel } = require('electron')
//
//// MessagePorts are created in pairs. A connected pair of message ports is
//// called a channel.
//const channel = new MessageChannel()
//
//// The only difference between port1 and port2 is in how you use them. Messages
//// sent to port1 will be received by port2 and vice-versa.
//const ctrlport1 = channel.port1
//const ctrlport2 = channel.port2
//
//// It's OK to send a message on the channel before the other end has registered
//// a listener. Messages will be queued until a listener is registered.
////ctrlport2.postMessage('message')
//
//// Here we send the other end of the channel, port1, to the main process. It's
//// also possible to send MessagePorts to other frames, or to Web Workers, etc.
//ipcRenderer.postMessage('ctrlport1', null, [ctrlport1])
