const fs = require('fs-extra'); // files operations
const scrape = require('website-scraper'); // web page scraper
var rimraf = require("rimraf"); // directory removing
var cheerio = require('cheerio'); // parser

// Removing old temp if exist
rimraf.sync("./temp");

const nodePath = process.argv[0];
const appPath = process.argv[1];
let bookPath = process.argv[2];

console.log('\n')
console.log('+---==< Ololo >==---+')
console.log("Node path: " + nodePath);
console.log("App path: " + appPath);
console.log();
console.log("==> Book path: " + bookPath);
console.log('---------------------')

// Creating or cleaning temp file for the page data
let fileTemp = './temp.txt'
fs.openSync(fileTemp, 'w')

let tempData = ''

// Scrapper plugins
class MyPlugin {
    apply(registerAction) {
        registerAction('beforeStart', async ({options}) => {console.log('==> Starting download secret zhumaysinba address from ', options.urls[0])});
        registerAction('afterFinish', async () => {console.log('==> Done! We got book address!')});
        registerAction('error', async ({error}) => {console.error(error)});
    }
    }

// Parameters for scraper
const options = {
    urls: ['http://kazneb.kz/bookView/view/?brId=1557843&lang=kk'],
    directory: './temp',
    sources: [
      {selector: 'none', attr: 'none'}
    ],
    recursive: false,
    plugins: [ new MyPlugin() ]
  };

const dataGet = () => {
    // console.log(tempData)
    fs.readFile('./temp/index.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        // console.log(data);
        // tempData = data
        const $ = cheerio.load(data)
        const pewpew = $('script')
        console.log(pewpew.text())
        console.log(pewpew.html())
      });
    
    


    console.log('ok, da')

}

scrape(options).then((result) => {tempData = result, console.log('-== Making zhumaysinba great again... ==-', '\n', '\n','---------------------'), dataGet()});
console.log('')

// We got the data on this moment...

