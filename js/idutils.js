// Check for xml:id collision
export function checkCollision(root) {
  const lst = idList(root);
  const set = new Set(lst);
  uniqueid = self.getUniqueId();
  lst.push(uniqueid);

  if ( set.size == lst.length ) {
    return uniqueid
  }
  else {
    const lst = [];
    return checkCollision.call(root);
  }
}

// Get xml:id's from document root
function idList(root) {
  const lst = [];

  ents = root.xpath("//*/@xml:id")
  for ( it in ents ) {
    lst.push(it);
  }
  return lst
}

// Get uuid for elements
function getUniqueId() {
  let uniquebase = crypto.randomUUID();
  var unique = uniquebase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); // cc31cad6645a41a185a63f00cf643b61
  var uuid = '_' + unique.slice(0, 10); // _b2f0f54d99
//  console.log(uuid);
  return uuid;
}

//module.exports = {
//  checkCollision,
////  writeData,
//  }
