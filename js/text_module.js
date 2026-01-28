import { Snowflake } from "@theinternetfolks/snowflake";

export function getSnowflake() {
  var uniqueid = Snowflake.generate({ timestamp: 1649157035498, shard_id: 4 })
  var uuid = '_' + uniqueid; // _6917065950617419944
  console.log(uuid);
}

function unEscape (entry_string) {
    xml_content = entry_string.replaceAll('&lt;', '<'); // &lt; = <
    xml_content = xml_content.replaceAll('&gt;', '>'); // &gt; = >
    return xml_content
}

export function addHeader (entry_string) {
  xml_content = unEscape(entry_string);
  headerFirst = '<?xml version="1.0" encoding="UTF-8"?>\n';
  headerSecond = '<?xml-stylesheet type="text/xsl" href="xsl/custom.xsl"?>\n';
  headerThird = '<!DOCTYPE TEI SYSTEM "z-tei-dictionary.dtd">\n';

  if ( !(xml_content.includes(headerSecond)) ) {
    xml_content = headerFirst + headerSecond + headerThird + xml_content;
  }
  return xml_content

}

//module.exports = {
//  unEscape,
//  addHeader,
//  }
