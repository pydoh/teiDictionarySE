var docSpec = {
  onchange: function(){
    console.log("Element changed now!")
  },
  validate: function(obj){
    console.log("Element validating now!")
  },
  elements: {
    "entry": {
      menu: [{
        caption: "New child <form>",
        action: Xonomy.newElementChild,
        actionParameter: "<form/>" // def, etym, sense
      }, {
        caption: "New child <def>",
        action: Xonomy.newElementChild,
        actionParameter: "<def/>"
      }, {
        caption: "New child <etym>",
        action: Xonomy.newElementChild,
        actionParameter: "<etym/>"
      }, {
        caption: "New child <sense>",
        action: Xonomy.newElementChild,
        actionParameter: "<sense/>"
      }]
    },
    "form": {
      hasText: true,
//      oneliner: true,
      menu: [{
        caption: "Add @label=\"something\"",
        action: Xonomy.newAttribute,
        actionParameter: {name: "label", value: "something"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("label");
        }
    }, {
      caption: "New child <orth>",
      action: Xonomy.newElementChild,
      actionParameter: "<orth/>"
    }, {
      caption: "New child <pron>",
      action: Xonomy.newElementChild,
      actionParameter: "<pron/>" // def, etym, sense
    }, {
      caption: "New child <pos>",
      action: Xonomy.newElementChild,
      actionParameter: "<pos/>"
    }, {
      caption: "New child <gloss>",
      action: Xonomy.newElementChild,
      actionParameter: "<gloss/>"
    }, {
      caption: "New child <usg>",
      action: Xonomy.newElementChild,
      actionParameter: "<usg/>"
    }, {
      caption: "New child <cit>",
      action: Xonomy.newElementChild,
      actionParameter: "<cit/>"
    }, {
      caption: "Delete this <item>",
      action: Xonomy.deleteElement
    }],
//    canDropTo: ["list"],
//      attributes: {
//        "label": {
//          asker: Xonomy.askString,
//          menu: [{
//            caption: "Delete this @label",
//            action: Xonomy.deleteAttribute
//          }]
//        }
//      }
    },
    "def": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "etym": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "sense": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "orth": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        asker: Xonomy.askString,
////        action: Xonomy.newElementChild,
////        actionParameter: "<extent/>"
//      }]
    },
    "pron": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "pos": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "gloss": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "usg": {
      hasText: true,
//      oneliner: true,
//      menu: [{
//        caption: "New child <extent>",
//        action: Xonomy.newElementChild,
//        actionParameter: "<extent/>"
//      }]
    },
    "cit": {
      menu: [{
        caption: "New child <quote>",
        action: Xonomy.newElementChild,
        actionParameter: "<quote/>"
      }, {
        caption: "New child <bibl>",
        action: Xonomy.newElementChild,
        actionParameter: "<bibl/>"
      }, {
        caption: "New child <gramGrp>",
        action: Xonomy.newElementChild,
        actionParameter: "<gramGrp/>"
      }]
    },
    "quote": {
      hasText: true,
//      oneliner: true,
      menu: [{
        caption: "New child <extent>",
        action: Xonomy.newElementChild,
        actionParameter: "<extent/>"
      }]
    },
    "bibl": {
      // "oneliner: true," conflicts with "hasText: true," (maybe only in laic mode???)
      hasText: true,
//      oneliner: true,
      menu: [{
        caption: "New child <extent>",
        action: Xonomy.newElementChild,
        actionParameter: "<extent/>"
      }]
    },
    "gramGrp": {
      hasText: true,
//      oneliner: true,
      menu: [{
        // Weird ass problem with <extent>
        caption: "New child <extent>",
        action: Xonomy.newElementChild,
        actionParameter: "<extent/>"
      }]
    },
    "extent": {
      hasText: true,
//      oneliner: true,
      menu: [{
        caption: "New child <extent>",
        action: Xonomy.newElementChild,
        actionParameter: "<extent/>"
      }]
    },
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
