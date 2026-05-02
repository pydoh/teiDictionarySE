import xml2js from "xml2js";
import path from 'path';

// Application modules
import { writeData } from './file_module.js';
import { getSnowflake, addHeader } from './text_module.js';
import { js_entry_obj, js_page_obj, js_file_obj, js_test_obj } from './js_objects.js';

// Advanced builder configuration
const build_options = {
//  advanced: true,
  headless: true,
  // Additional options
}

export function parseXml(fn, xml_string, default_path, prj_Name, filePath) { //, log, cb
  if (!xml_string) {
//    log.debug('request xml is missing');
    console.log('request xml is missing');
    return //cb(errors.MalformedXML);
  }
  var parser = new xml2js.Parser();
  return parser.parseString(xml_string, (err, js_obj) => {
    if (err) {
//      log.debug('request xml is malformed');
      console.log('request xml is malformed');
      return //cb(errors.MalformedXML);
    }
    fn(js_obj, default_path, prj_Name, filePath);
  }) // .then
//  .then((js_obj) => {
//    if (js_obj === null) {
//      console.log('user cancelled');
//    } else {
//      return js_obj; // Return the js_obj
//    }
//  })
}

function buildXml(js_obj) {
    var builder = new xml2js.Builder(build_options);
//    console.log(js_obj);
    var xml_result = builder.buildObject(js_obj);
//    console.log(xml_result);
    return xml_result
}

function setAttribute (target, attrib) {
  for (let nextKey in target) {
    if (nextKey === attrib) {
      target[nextKey] = getSnowflake();
    }
  }
}

function removeAttribute(target, attrib) {
  for (let nextKey in target) {
    if (nextKey === attrib) {
      delete target[nextKey];
    }
  }
  return target
}

//function attributeIter(target, attrib, method) {
//  for (let nextKey in target) {
//    if (nextKey === attrib) {
////      target[nextKey] = getSnowflake();
////      delete target[nextKey];
//      method target[nextKey];
//    }
//  }
//}

function recursiveIter(fn, js_obj, attrib){
  for (var i in js_obj){
    if (typeof js_obj[i] === "object") {
//      setAttribute(js_obj[i], 'xml:id');
//      removeAttribute(js_obj[i], 'xmlns');
      fn(js_obj[i], attrib);
      recursiveIter(fn, js_obj[i], attrib);
    }
    else {
      break;
//      $('.ins').append(js_obj[i]);  // or what do you want to do with that
    }
  }
}

export function newEntryXml() {
    recursiveIter(setAttribute, js_entry_obj, 'xml:id');
    let xml_result = buildXml(js_entry_obj);
    return xml_result
    console.log(xml_result);
}

export function newPageXml() {
    recursiveIter(setAttribute, js_page_obj, 'xml:id');
    let xml_result = buildXml(js_page_obj);
    return xml_result
    console.log(xml_result);
}

export function newFileXml(filename) {
  // Thanks to Claude
  const newObj = JSON.parse(JSON.stringify(js_file_obj));

  newObj.TEI.text.body.head._ = filename;  // "_" is the typical text content key

  recursiveIter(setAttribute, newObj, 'xml:id');
  let xml_result = buildXml(newObj);
  xml_result = addHeader(xml_result);
  return xml_result;
}

export function saveToFile(js_obj, default_path, prj_Name, filePath) {
//    console.log('after parser: ', js_obj);
    recursiveIter(removeAttribute, js_obj, 'xmlns');
    let xml_result = buildXml(js_obj);
//    console.log('after builder: ', xml_result);
    xml_result = addHeader(xml_result);
    writeData(default_path, prj_Name, xml_result, filePath);
}

//newEntryXml();
//newPageXml();
//newFileXml();

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
