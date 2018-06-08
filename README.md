
# Decomposer

Decomposer is build to convert bson data to csv enjoy 
  
  

    node index.js [bson_file_path] [mapper file name] [Top(number) Optional]
    Example
    node index.js sampleData\tweets.bson mapTweet.js 
    For first 1 record 
    node index.js sampleData\tweets.bson mapTweet.js 1
  

Mapper file converts single document in a json or array of json object

Below given sample
  
    //return object or Array of Objets (for child rows)
    function map(document) {
	    delete document._id
	    return document;
    }
    exports.map = map;
