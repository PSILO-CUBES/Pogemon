export function setSaveData(saveData){
    function stringify(obj) {
        let cache = [];
        let str = JSON.stringify(obj, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null; // reset the cache
        return str;
    }

    console.log(saveData)
    localStorage.setItem("saveFile", stringify(saveData))
}

export async function loadData(){
    const data = JSON.parse(localStorage.getItem("saveFile"))
    
    if(data == undefined) return null
    return data
}