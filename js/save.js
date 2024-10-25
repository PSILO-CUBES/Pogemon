export function setSaveData(saveData){
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

    localStorage.setItem("saveFile", stringify(saveData))
    
    console.log(JSON.parse(localStorage.getItem("saveFile")))
}

export async function loadData(){
    const data = JSON.parse(localStorage.getItem("saveFile"))
    
    if(data == undefined) return null
    return data
}