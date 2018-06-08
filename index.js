const BSON = require('bson');

const fs = require('fs');
const path = require("path")
var BSONStream = require('bson-stream');

const csv = require('fast-csv');

var isBSON = false;
var FileToConvert = "";
var MapFileName = "";
var Top = 0;
var useTop = false;
let doneCount = 0
let isClosed = false;
if (process.argv.length < 4) {

    console.log("please provide the BSON and mapper function file name");
    console.log("for exmple : Dcomposer tweet.bson tweetMap.js");
    process.exit();
}

FileToConvert = path.join(__dirname, process.argv[2]);
MapFileName = path.join(__dirname, process.argv[3]);
if (process.argv[4] !== undefined) {
    Top = parseInt(process.argv[4]) || 0;
    useTop = true;
}

let CSVFileName = FileToConvert
    .toLocaleLowerCase()
    .replace('.bson', '.csv');

const mapper = require(MapFileName);

if (FileToConvert) {
    var rs = fs.createReadStream(FileToConvert);
    var csvStream = csv.createWriteStream({headers: true}),
        writableStream = fs.createWriteStream(CSVFileName);
    csvStream.pipe(writableStream);

    rs
        .pipe(new BSONStream())
        .on('data', function (obj) {
            if (useTop == true) {
                if (Top != 0) {
                    Top--;
                } else {
                    isClosed =true;
                    rs.close();
                    rs.emit("end");
                }
            }
            if(isClosed) return;

            let output = mapper.map(obj);
            doneCount++;
            if (output.length == undefined) {
                csvStream.write(output);
            } else {
                //array
                output.forEach((x) => {
                    csvStream.write(x);
                })
            }
            // console.log('#', doneCount);
            process.stdout.write('.')
        })
        .on('end', () => {
            csvStream.end();
            console.warn(".completed");
            console.log(`file converted with ${doneCount} rows`);
        })

}
