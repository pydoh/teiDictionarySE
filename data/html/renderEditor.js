// -> Custom javascript --------------------------------------------------------------------------
function start() {
  window.onmessage = (event) => {
    // event.source === window means the message is coming from the preload
    // script, as opposed to from an <iframe> or other source.
    if (event.source === window && event.data === 'edit_port2') {
      const [ edit_port2 ] = event.ports;
      this.edit_port2 = edit_port2;
    } else if (event.source === window && event.data === 'xmlid_port1') {
      const [ xmlid_port1 ] = event.ports;
      this.xmlid_port1 = xmlid_port1;
//      getXmlId();

    }

    // Once we have the port, we can communicate directly with the main
    // process.
    this.edit_port2.onmessage = (event) => {
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
        this.edit_port2.postMessage(newelem);
        closeWindow();
      }

      function closeWindow() {
        this.edit_port2.close();
        window.close();
      }
    }

// -> Custom javascript ==========================================================================

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
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
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
            caption: "Insert @firstname and @surname",
            action: Xonomy.insertTwoAttributes,
            actionParameter: {name1: "firstname", name2: "surname"},
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
          mustBeBefore: ["def"],
          hasText: true,
    //      oneliner: true,

    //      attributes: [
    //        {name: 'xml:id',
    //          mandatory: true,
    //          value: '_65',
    ////          asker: Xonomy.askString,
    //        },
    //      ],

          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "firstname": {
    //          asker: Xonomy.askString,
            },
            "surname": {
    //          asker: Xonomy.askString,
            },
          },
          menu: [{
            caption: "Add @xml:id",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:id", value: "NCName"},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:id");
            },
          }, {
            caption: "Insert @firstname and @surname",
            action: Xonomy.insertTwoAttributes,
            actionParameter: {name1: "firstname", value1: "firstname", name2: "surname", value2: "surname"},
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
          mustBeBefore: ["etym"],
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "etym": {
          mustBeBefore: ["sense"],
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "sense": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "orth": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
          },
          menu: [{
            caption: "Add @xml:id",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:id", value: "NCName"},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:id");
            },
          }, {
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
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
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "pos": {
          hasText: true,
    //      oneliner: true,
          asker: Xonomy.askPicklist,
          askerParameter: [
            "noun",
            "pronoun",
            "verb",
            "adjective",
            "adverb",
            "preposition",
            "conjunction",
            "interjection",
            "determiners",
            "articles",
            "numerals",
          ],
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
    //        "xml:lang": {
    //          asker: Xonomy.askPicklist,
    //          askerParameter: [
    //            {value: "en", caption: "English"},
    //            {value: "sp", caption: "Spanish"},
    //          ],
    //        },
    //        "myOtherAttribute": {...},
          },
          menu: [{
            caption: "Add @xml:id",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:id", value: "NCName"},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:id");
            },
    //      }, {
    //        caption: "Add @xml:lang",
    //        action: Xonomy.newAttribute,
    //        actionParameter: {name: "xml:lang", value: ""},
    //        hideIf: function(jsElement){
    //          return jsElement.hasAttribute("xml:lang");
    //        },
          }]
        },
        "gloss": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "usg": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "cit": {
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
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
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "bibl": {
          // "oneliner: true," conflicts with "hasText: true," (maybe only in laic mode???)
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "gramGrp": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }]
        },
        "extent": {
          hasText: true,
    //      oneliner: true,
          attributes: {
            "xml:id": {
              menu: [{
                caption: "Generate @xml:id",
                action: Xonomy.getXmlId,
              }],
            },
            "xml:lang": {
              asker: Xonomy.askPicklist,
              askerParameter: [
                {value: "en", caption: "English"},
                {value: "sp", caption: "Spanish"},
              ],
            },
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
            caption: "Add @xml:lang",
            action: Xonomy.newAttribute,
            actionParameter: {name: "xml:lang", value: ""},
            hideIf: function(jsElement){
              return jsElement.hasAttribute("xml:lang");
            },
          }, {
            caption: "New <extent>",
            action: Xonomy.newElementAfter,
            actionParameter: "<extent/>",
          }]
        },
      }
    };

// -> Custom javascript ==========================================================================

  }

}

// -> Custom javascript --------------------------------------------------------------------------
