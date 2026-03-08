var docSpec = {
  onchange: function(){
    console.log("Element changed now!")
  },
  validate: function(obj){
    console.log("Element validating now!")
  },
  elements: {
    "entry": {
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
//        hideIf: function(jsElement){
//          return jsElement.hasAttribute("xml:id");
//        },
      }, {
        caption: "New child <def>",
        action: Xonomy.newElementChild,
        actionParameter: "<def/>",
        hideIf: function(jsElement) {
          return jsElement.hasChildElement("def");
        },
      }, {
        caption: "New child <etym>",
        action: Xonomy.newElementChild,
        actionParameter: "<etym/>",
        hideIf: function(jsElement) {
          return jsElement.hasChildElement("etym");
        },
      }, {
        caption: "New child <sense>",
        action: Xonomy.newElementChild,
        actionParameter: "<sense/>",
        hideIf: function(jsElement) {
          return jsElement.hasChildElement("sense");
        },
      }]
    },
    "form": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
//        hideIf: function(jsElement){
//          return jsElement.hasAttribute("xml:id");
//        },
      }, {
        caption: "New <form>",
        action: Xonomy.newElementAfter,
        actionParameter: "<form/>",
      }, {
          caption: "New child",
          menu: [{
            caption: "New <orth>",
            action: Xonomy.newElementChild,
            actionParameter: "<orth/>",
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("orth");
            },
          }, {
            caption: "New <pron>",
            action: Xonomy.newElementChild,
            actionParameter: "<pron/>", // def, etym, sense
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("pron");
            },
          }, {
            caption: "New <pos>",
            action: Xonomy.newElementChild,
            actionParameter: "<pos/>",
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("pos");
            },
          }, {
            caption: "New <gloss>",
            action: Xonomy.newElementChild,
            actionParameter: "<gloss/>",
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("gloss");
            },
          }, {
            caption: "New <usg>",
            action: Xonomy.newElementChild,
            actionParameter: "<usg/>",
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("usg");
            },
          }, {
            caption: "New <cit>",
            action: Xonomy.newElementChild,
            actionParameter: "<cit/>",
            hideIf: function(jsElement) {
              return jsElement.hasChildElement("cit");
            },
          }],
        }, {
          caption: "Delete this <item>",
          action: Xonomy.deleteElement
        }],
//        canDropTo: ["list"],
//          attributes: {
//            "xml:id": {
//              asker: Xonomy.askString,
//              menu: [{
//                caption: "Delete this @label",
//                action: Xonomy.deleteAttribute
//              }]
//            }
//            "label": {
//              asker: Xonomy.askString,
//              menu: [{
//                caption: "Delete this @label",
//                action: Xonomy.deleteAttribute
//              }]
//            }
//          }
    },
    "def": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "etym": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "sense": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "orth": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
        "xml:lang": {},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }, {
        caption: "New <orth>",
        action: Xonomy.newElementAfter,
        actionParameter: "<orth/>",
      }]
    },
    "pron": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "pos": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "gloss": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "usg": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "cit": {
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }, {
        caption: "New <cit>",
        action: Xonomy.newElementAfter,
        actionParameter: "<cit/>",
      }, {
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
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "bibl": {
      // "oneliner: true," conflicts with "hasText: true," (maybe only in laic mode???)
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "gramGrp": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }]
    },
    "extent": {
      hasText: true,
//      oneliner: true,
      attributes: {
        "xml:id": {},
//        "myOtherAttribute": {...},
      },
      menu: [{
        caption: "Add @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
        hideIf: function(jsElement){
          return jsElement.hasAttribute("xml:id");
        },
      }, {
        caption: "Generate @xml:id",
        action: Xonomy.newAttribute,
        actionParameter: {name: "xml:id", value: "NCName"},
      }, {
        caption: "New <extent>",
        action: Xonomy.newElementAfter,
        actionParameter: "<extent/>",
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
