const { ipcRenderer } = require('electron')

ipcRenderer.on('save_port2', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0];
  let save_port2 = window.electronMessagePort;

  save_port2.onmessage = messageEvent => {
    // handle message
    xml_content = document.getElementById('tei_wrapper').innerHTML;
    save_port2.postMessage(xml_content);
  };

});

// -> Custom javascript --------------------------------------------------------------------------
//### 6. **Commented-Out Code**
//Several lines are commented out (e.g., `elemId` handling), suggesting incomplete or abandoned logic.
//var elem = '';
//var elemid = '';

// Get edit_ports
function getEditPorts() {
  // A connected pair of message ports is called a channel.
  const edit_channel = new MessageChannel()
  // Messages sent on port1 will be received by port2 and vice-versa.
  const edit_port1 = edit_channel.port1;
  const edit_port2 = edit_channel.port2;
  edit_port1.onmessage = editMessage;
  ipcRenderer.postMessage('edit port', null, [edit_port2]);
  return edit_port1
};

//### 7. **No Cleanup of Event Listeners**
//Ports and event listeners are not cleaned up when no longer needed, risking memory leaks.
// DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
  // EventListener for element click
  document.addEventListener('click', elemClick);
});

// Handle messages received on port1
function elemClick(e) {
  let elem = e.target.closest('entry').outerHTML;
//  elemId = e.target.closest('entry').id // doesn't work with 'xml:id'
  let element = e.target.closest('entry'); // because it's an 'xml:id'
//  elemId = element.getAttribute('xml:id'); // does seem to work
//  ### 5. **Redundant Port Creation**
//  `getEditPorts()` is called on every click, creating a new `MessageChannel` each time.
//  ensure old ports are closed
  // Get new edit_ports for every new instance of window
  let edit_port1 = getEditPorts();
  // Send the message on edit_port1
  edit_port1.postMessage(elem);
}

// Handle messages received on edit_port1
function editMessage(messageEvent) {
//  document.getElementById(elemId).replaceWith(messageEvent.data); // doesn't work with 'xml:id'
  element.replaceWith(messageEvent.data); // does seem to work
//  ### 2. **Missing Error Handling**
//  No try/catch blocks around DOM operations or message handling.
  let xml_content = document.getElementById('tei_wrapper').innerHTML;
  xml_content = xml_content.replaceAll('&lt;', '<'); // &lt; = <
  xml_content = xml_content.replaceAll('&gt;', '>'); // &gt; = >
//  ### 3. **Inefficient DOM Updates**
//  After replacing an element, the entire `tei_wrapper` innerHTML is re-parsed and re-set due to `&lt;`/`&gt;` replacement.
  document.getElementById('tei_wrapper').innerHTML = xml_content;
//  ### 4. **Security Risk: InnerHTML with Untrusted Data**
//  Using `innerHTML = xml_content` after string replacements risks XSS if the XML contains script tags or malicious content.
}

// -> Custom javascript --------------------------------------------------------------------------
