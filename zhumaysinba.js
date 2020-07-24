const fs = require('fs-extra'); // files operations
const scrape = require('website-scraper'); // web page scraper

const nodePath = process.argv[0];
const appPath = process.argv[1];
let bookPath = process.argv[2];

console.log('+---==< Ololo >==---+')
console.log("Node path: " + nodePath);
console.log("App path: " + appPath);
console.log();
console.log(" ==> Book path: " + bookPath);
console.log('---------------------')

// Creating or cleaning temp file for the page data
let fileTemp = './temp.txt'
fs.openSync(fileTemp, 'w')

// Parameters for scraper
const options = {
    urls: ['http://kazneb.kz/bookView/view/?brId=1557843&lang=kk'],
    directory: './temp1',
    sources: [
      {selector: 'script', attr: 'src'}
    ],
    recursive: false
  };

// Scrapper plugins
class MyPlugin {
apply(registerAction) {
    registerAction('beforeStart', async ({options}) => {console.error('Starting download book from ', options.urls[0])});
    registerAction('afterFinish', async () => {});
    registerAction('error', async ({error}) => {console.error(error)});
    registerAction('beforeRequest', async ({resource, requestOptions}) => ({requestOptions}));
    registerAction('afterResponse', async ({response}) => response.body);
    registerAction('onResourceSaved', ({resource}) => {});
    registerAction('onResourceError', ({resource, error}) => {});
    registerAction('saveResource', async ({resource}) => {});
    registerAction('generateFilename', async ({resource}) => {})
    registerAction('getReference', async ({resource, parentResource, originalReference}) => {})
}
}

scrape(options).then((result) => {console.log(result)});