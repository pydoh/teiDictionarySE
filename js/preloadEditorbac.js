const { ipcRenderer } = require('electron')

ipcRenderer.on('editport2', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0];
  editport2 = window.electronMessagePort;
//  alert(e.ports[0]);

  // Handle messages received on editport2
  editport2.onmessage = onMessage;

})

// Continue to handle window "close" event here
ipcRenderer.on('get_port', event => {
//  alert(event);
  ipcRenderer.postMessage('editport2', null, [editport2]);
//  editport2.close();
});

// Handle messages received on editport2
function onMessage(event) {
  // handle message
//  editport2.postMessage('pong');
//  alert(event.data);
  // document.getElementById('editor').value is working
  document.getElementById('editor').value = event.data;
}

// -> Custom javascript --------------------------------------------------------------------------
// DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  const cancel = window.document.querySelector("#cancelBtn");
  const save = window.document.querySelector("#saveBtn");

  // Listen for button clicks
  cancel.addEventListener('click', () => { onCancel() });
  save.addEventListener("click", () => { onSave() });

  function onCancel() {
    window.close();
  }

  function onSave() {
    newelem = window.document.getElementById('editor').value;
    editport2.postMessage(newelem);
    window.close();
  }
});
// -> Custom javascript --------------------------------------------------------------------------
