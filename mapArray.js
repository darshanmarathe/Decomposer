function map(document) {
    console.dir(document);
    delete document._id
    
    return [{ a : 1 , b : 2 , c : 3} , {a : 4 , b : 5 , c : 6} , {a : 7 , b : 8 , c : 9}];
}


exports.map =  map;
