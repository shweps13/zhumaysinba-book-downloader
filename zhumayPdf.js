const fs = require('fs-extra');

let pdfData = fs.readFileSync('pdfData.txt', 'utf8').split('\n')
console.log(pdfData)
console.log(pdfData.length)