const { ipcRenderer } = require('electron')

ipcRenderer.on('editport2', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0];
  editport2 = window.electronMessagePort;

  // Handle messages received on editport2
  editport2.onmessage = onMessage;

})

// Handle messages received on editport2
function onMessage(event) {
  // Handle data
  document.getElementById('editor').value = event.data;
}

// -> Custom javascript --------------------------------------------------------------------------

// -> Custom javascript --------------------------------------------------------------------------
// DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  const cancel = window.document.querySelector("#cancelBtn");
  const save = window.document.querySelector("#saveBtn");

  // Listen for button clicks
  cancel.addEventListener('click', () => { onCancel() });
  save.addEventListener("click", () => { onSave() });

  function onCancel() {
    closeWindow();
  }

  function onSave() {
    var newelem = window.document.getElementById('editor').value;
    editport2.postMessage(newelem);
    closeWindow();
  }

  function closeWindow() {
    editport2.close();
    window.close();
  }

});

// -> Custom javascript --------------------------------------------------------------------------
