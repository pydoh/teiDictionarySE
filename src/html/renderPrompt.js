// -> Custom javascript --------------------------------------------------------------------------
function start() {
  window.onmessage = (event) => {
    if (event.source === window && event.data === 'filename_port1') {
      const [ filename_port1 ] = event.ports;
      this.filename_port1 = filename_port1;
    }

    const cancel = window.document.querySelector("#cancel");
    const save = window.document.querySelector("#save");

    // Listen for button clicks
    cancel.addEventListener('click', () => { onCancel() });
    save.addEventListener("click", () => { onSave() });

    function onCancel() {
      closeWindow();
    }

    function onSave() {
      var filename = document.getElementById("data").value;
      this.filename_port1.postMessage(filename);
      closeWindow();
    }

    function closeWindow() {
      this.filename_port1.close();
      window.close();
    }
  }
}

// -> Custom javascript ==========================================================================
