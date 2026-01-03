const { ipcRenderer } = require('electron')

ipcRenderer.on('ctrlport2', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0];
  ctrlport2 = window.electronMessagePort;
  alert('ctrlport2');

  ctrlport2.onmessage = messageEvent => {
    // handle message
    xml_content = document.getElementById('tei_wrapper').innerHTML;
    ctrlport2.postMessage(xml_content);
    alert(xml_content);
  };

});

// -> Custom javascript --------------------------------------------------------------------------
var elem = '';
var elemid = '';

// Get editports
function getEditPorts() {
  // A connected pair of message ports is called a channel.
  const editchannel = new MessageChannel()
  // Messages sent on port1 will be received by port2 and vice-versa.
  const editport1 = editchannel.port1;
  const editport2 = editchannel.port2;
  editport1.onmessage = editMessage;
  ipcRenderer.postMessage('port', null, [editport2])
  return editport1
};

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  // EventListener for element click
  document.addEventListener('click', elemClick);
});

// Handle messages received on port1
function elemClick(e) {
  elem = e.target.closest('entry').outerHTML;
  elemId = e.target.closest('entry').id
  // Get new editports for every new instance of window
  editport1 = getEditPorts();
  // Send the message on editport1
  editport1.postMessage(elem);
}

// Handle messages received on editport1
function editMessage(messageEvent) {
  document.getElementById(elemId).replaceWith(messageEvent.data);
  xml_content = document.getElementById('tei_wrapper').innerHTML;
  xml_content = xml_content.replaceAll('&lt;', '<'); // &lt; = <
  xml_content = xml_content.replaceAll('&gt;', '>'); // &gt; = >
  document.getElementById('tei_wrapper').innerHTML = xml_content;
}

// -> Custom javascript --------------------------------------------------------------------------
