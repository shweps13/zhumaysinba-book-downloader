const fs = require('fs-extra');

const nodePath = process.argv[0];
const appPath = process.argv[1];
let bookPath = process.argv[2];

console.log('+---==< Ololo >==---+')
console.log("Node path: " + nodePath);
console.log("App path: " + appPath);
console.log();
console.log("Book path: " + bookPath);
console.log('---------------------')

let fileTemp = './temp.txt'
fs.ensureFile(fileTemp, err => {
    console.log(err) // => null
});