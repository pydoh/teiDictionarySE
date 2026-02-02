import xml2js from "xml2js";

// Import required application modules/methods
//const { readData, writeData } = require('./js/file_module.js');
import getSnowflake from 'text_module.js';

// -----------------------------------------------------------------------
//var parser = new xml2js.Parser();
//var builder = new xml2js.Builder();
// -----------------------------------------------------------------------

//export function xmlFileToJs(filename, cb) {
////    var filepath = path.normalize(path.join(__dirname, filename));
//    var parser = new xml2js.Parser();
////    fs.readFile(filepath, 'utf8', function (err, xmlStr) {
////        if (err) throw (err);
//        xml2js.parseString(xmlStr, {}, cb);
////    });
//}

let obj = {
  TEI: {  $: {  "xmlns": "http://www.w3.org/1999/xhtml"  ,
                "tei": "http://www.tei-c.org/ns/1.0"  ,
                "xml": "http://www.w3.org/XML/1998/namespace"  ,
                "xml:id": "uuid"  },
    teiHeader: {  $: {  "xml:id": "uuid"  },  },
    text: {  $: {  "xml:id": "uuid"  },
      body: {  $: {  "xml:id": "uuid"  },
        head: {  $: {  "xml:id": "uuid"  },  },
        div: {  $: {  "xml:id": "uuid"  },
          entry: {  $: {  "xml:id": "uuid"  , "xml:lang": "en"  },
          },
        }
      }
    }
  }
};

// Iterate through the object
function recursiveIter(js_obj){
  for (var i in js_obj){
    if (typeof js_obj[i] === "object") {
      setAttribution(js_obj[i], 'xml:id', null);
      recursiveIter(js_obj[i]);
    }
    else {
//      console.log('pass');
      break;
//      $('.ins').append(js_obj[i]);  // or what do you want to do with that
    }
  }
}

// Set attribution
function setAttribution (targets, attrib, value) { // 'xml:id'
  for (let nextKey in targets) {
    if (nextKey !== attrib) {
      return;
    }
    else if (nextKey === attrib) {
      targets[nextKey] = getSnowflake();
    }
  }
}

export function jsToXmlFile() {  // js_obj filename, , cb
//    var filepath = path.normalize(path.join(__dirname, filename));
//    console.log('test', js_obj);
    recursiveIter(js_obj);
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(js_obj);
    console.log(xml);
//    fs.writeFile(filepath, xml, cb);
}

//jsToXmlFile();
//recursiveIter(js_obj);
//getSnowflake();

//  . . . more here?
//    teiHeader
//      fileDesc
//    text
//      body
//        head
//        div
//          entry

//<TEI xmlns="http://www.w3.org/1999/xhtml" tei="http://www.tei-c.org/ns/1.0" xml="http://www.w3.org/XML/1998/namespace" xml:id="id1">
//  <teiHeader xml:id="id2">
//  </teiHeader>
//  <text xml:id="id10">
//    <body xml:lang="">
//      <head xml:id="id12">Aa</head>
//      <div xml:id="id13" part="N" org="uniform" sample="complete">
//        <entry xml:id="_101a54371d" xml:lang="en" type="main">
//        </entry>
//  </text>
//</TEI>
