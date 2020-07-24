const fs = require('fs-extra'); // files operations
const scrape = require('website-scraper'); // web page scraper
var rimraf = require("rimraf"); // directory removing

// Removing old temp if exist
rimraf.sync("./temp1");

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



// Scrapper plugins
class MyPlugin {
    apply(registerAction) {
        registerAction('beforeStart', async ({options}) => {console.log('==> Starting download secret zhumaysinba address from ', options.urls[0])});
        // registerAction('beforeStart', async ({options}) => {rimraf("./temp1", function () { console.log("==> [Old temp removed]") })});
        registerAction('afterFinish', async () => {console.log('==> Done! We got book address!')});
        registerAction('error', async ({error}) => {console.error(error)});
    }
    }

// Parameters for scraper
const options = {
    urls: ['http://kazneb.kz/bookView/view/?brId=1557843&lang=kk'],
    directory: './temp1',
    sources: [
      {selector: 'script', attr: 'src'}
    ],
    recursive: false,
    plugins: [ new MyPlugin() ]
  };

scrape(options).then((result) => {console.log('-== Making zhumaysinba great again... ==-', '\n', '\n','---------------------')});
console.log('')