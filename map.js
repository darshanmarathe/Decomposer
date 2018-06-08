function map(document) {
    console.log(document);
    let objToReturn = {};
    objToReturn._id = document._id;
    for (const key in document) {
        if (document.hasOwnProperty(key)) {
            const element = document[key];
            if (typeof element !== "object" || key === "_id") 
                objToReturn[key] = element;
            else if (!Array.isArray(element)) 
                objToReturn = MapObject(element, objToReturn)
        }

    }

    return objToReturn;
}

function MapObject(input, objToReturn) {
    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const element = input[key];
            if (typeof element !== "object") 
                objToReturn[key] = element;
            else if (!Array.isArray(element)) 
                objToReturn = MapObject(element, objToReturn)
        }

    }

    return objToReturn;

}

exports.map = map;
