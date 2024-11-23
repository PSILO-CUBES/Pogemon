export function setSaveData(type, saveData){
    function stringify(obj) {
      let cache = [];
      let str = JSON.stringify(obj, function(key, value) {
        if (typeof value === "object" && value !== null) {
          // Circular reference found, discard key
          if (cache.indexOf(value) !== -1) return

          // Store value in our collection
          cache.push(value);
        }
        return value;
      });
      cache = null; // reset the cache
      return str;
  }

  localStorage.setItem(type, stringify(saveData))
  
  console.log(JSON.parse(localStorage.getItem(type)))
}

export async function loadData(type){
    const data = JSON.parse(localStorage.getItem(type))
    
    if(data == undefined) return null
    return data
}