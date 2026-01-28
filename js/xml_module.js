var xml2js = require('xml2js');

// -----------------------------------------------------------------------
//var parser = new xml2js.Parser();
//var builder = new xml2js.Builder();
// -----------------------------------------------------------------------

export function xmlFileToJs(filename, cb) {
//    var filepath = path.normalize(path.join(__dirname, filename));
    var parser = new xml2js.Parser();
//    fs.readFile(filepath, 'utf8', function (err, xmlStr) {
//        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
//    });
}

export function jsToXmlFile(filename, obj, cb) {
//    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
//    fs.writeFile(filepath, xml, cb);
}
