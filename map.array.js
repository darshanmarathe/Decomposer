function map(document) {
   // console.log(document);
    const property ="ids";
    let the_array = document[property];

    let objectArray = [];
    for (let elem of the_array) {
        let objToReturn = {};
        objToReturn._id = document._id;
        objectArray.push(MapObject(elem , objToReturn));

    }
    return objectArray;
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
