let csvToJson = require('convert-csv-to-json');

let json = csvToJson.getJsonFromCsv("product.csv");

console.log(json)