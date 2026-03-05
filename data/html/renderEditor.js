var docSpec={
  onchange: function(){
    console.log("I been changed now!")
  },
  validate: function(obj){
    console.log("I be validatin' now!")
  },
  elements: {
    "list": {
      menu: [{
        caption: "Append an <item>",
        action: Xonomy.newElementChild,
        actionParameter: "<item/>"
      }]
    },
    "item": {
      menu: [{
        caption: "Add @label=\"something\"",
        action: Xonomy.newAttribute,
        actionParameter: {name: "label", value: "something"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("label");
        }
    }, {
      caption: "New child <item>",
      action: Xonomy.newElementChild,
      actionParameter: "<item/>"
    }, {
      caption: "New <item> before this",
      action: Xonomy.newElementBefore,
      actionParameter: "<item/>"
    }, {
      caption: "New <item> after this",
      action: Xonomy.newElementAfter,
      actionParameter: "<item/>"
    }, {
      caption: "Delete this <item>",
      action: Xonomy.deleteElement
    }],
    canDropTo: ["list"],
      attributes: {
        "label": {
          asker: Xonomy.askString,
          menu: [{
            caption: "Delete this @label",
            action: Xonomy.deleteAttribute
          }]
        }
      }
    }
  }
};

// -> Custom javascript --------------------------------------------------------------------------
function start() {
  window.onmessage = (event) => {
    // event.source === window means the message is coming from the preload
    // script, as opposed to from an <iframe> or other source.
    if (event.source === window && event.data === 'editport2') {
      const [ editport2 ] = event.ports
      // Once we have the port, we can communicate directly with the main
      // process.
      editport2.onmessage = (event) => {
        var xml = event.data;
        var editor=document.getElementById("editor");
        Xonomy.render(xml, editor, docSpec);

        const cancel = window.document.querySelector("#cancelBtn");
        const save = window.document.querySelector("#saveBtn");

        // Listen for button clicks
        cancel.addEventListener('click', () => { onCancel() });
        save.addEventListener("click", () => { onSave() });

        function onCancel() {
          closeWindow();
        }

        function onSave() {
          var newelem = Xonomy.harvest();
          editport2.postMessage(newelem);
          closeWindow();
        }

        function closeWindow() {
          editport2.close();
          window.close();
        }
      }
    }
  }
}
// -> Custom javascript --------------------------------------------------------------------------
