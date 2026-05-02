  // basic entry for historical linguistics (minimum required elements)
//  method4 () {
//    <entry> -> <form> -> <orth>
//                      -> <cit> -> <quote>
//                               -> <bibl> -> <extent>
//  }
export const js_entry_obj = {
  entry: {  $: {  "xml:id": "uuid"  },
    form: {  $: {  "xml:id": "uuid"  },
      orth: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
      },
      cit: {  $: {  "xml:id": "uuid"  },
        quote: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
        },
        bibl: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
          extent: {  $: {  "xml:id": "uuid"  },
          },
        },
      },
    },
  },
};

export const js_page_obj = {
  div: {  $: { "xml:id": "uuid" },
    div: [
      { '$': { 'xml:id': 'uuid' },
        cb: [{ '$': { 'xml:id': 'uuid', n: '1' } }]
      },
      { '$': { 'xml:id': 'uuid' },
        cb: [{ '$': { 'xml:id': 'uuid', n: '2' } }]
      }
    ],
    pb: [{ '$': { 'xml:id': 'uuid', n: '' } }]
  },
};

export const js_file_obj = {
  TEI: {  $: {  "xmlns": "http://www.w3.org/1999/xhtml"  ,
                "tei": "http://www.tei-c.org/ns/1.0"  ,
                "xml": "http://www.w3.org/XML/1998/namespace"  ,
                "xml:id": "uuid"  },
    teiHeader: {  $: {  "xml:id": "uuid"  },  },
    text: {  $: {  "xml:id": "uuid"  },
      body: {  $: {  "xml:id": "uuid"  },
        head: {  $: {  "xml:id": "uuid"  },  },
        div: {  $: {  "xml:id": "uuid"  },
          div: {  $: { "xml:id": "uuid" },
            div: [
              { '$': { 'xml:id': 'uuid' },
                cb: [{ '$': { 'xml:id': 'uuid', n: '1' } }]
              },
              {'$': { 'xml:id': 'uuid' },
                cb: [{ '$': { 'xml:id': 'uuid', n: '2' } }]
              }
            ],
            pb: [{ '$': { 'xml:id': 'uuid', n: '1' } }]
          },
        }
      }
    }
  }
};

export const js_test_obj = {
  TEI: {  $: {  "xmlns": "http://www.w3.org/1999/xhtml"  ,
                "tei": "http://www.tei-c.org/ns/1.0"  ,
                "xml": "http://www.w3.org/XML/1998/namespace"  ,
                "xml:id": "uuid"  },
    teiHeader: {  $: {  "xml:id": "uuid"  },  },
    text: {  $: {  "xml:id": "uuid"  },
      body: {  $: {  "xml:id": "uuid"  },
        head: {  $: { "xmlns": "http://www.w3.org/1999/xhtml"  , "xml:id": "uuid"  },  },
        div: {  $: { "xmlns": "http://www.w3.org/1999/xhtml"  , "xml:id": "uuid"  },
          entry: {  $: { "xmlns": "http://www.w3.org/1999/xhtml"  , "xml:id": "uuid"  , "xml:lang": ""  },
            form: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
              orth: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
              },
              cit: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
                bibl: {  $: {  "xml:id": "uuid"  , "xml:lang": ""  },
                },
              },
            },
          },
        }
      }
    }
  }
};
