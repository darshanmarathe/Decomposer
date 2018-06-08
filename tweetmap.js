function map(document) {
    console.log(document)
    for (const key in document) {
        if (document.hasOwnProperty(key)) {
            const element = document[key];
            if (typeof element === "object") {
                if (Array.isArray(element)) {
                    console.log("Array" , key)
                }else{
                    console.log("object" , key)
                }
            }
        }
    }


    return document;
}
exports.map = map;
