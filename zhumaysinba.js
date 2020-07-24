const fs = require('fs-extra'); // files operations
const scrape = require('website-scraper'); // web page scraper
var rimraf = require("rimraf"); // directory removing
var cheerio = require('cheerio'); // parser
const download = require('image-downloader') // image downloader

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
    urls: [`http://kazneb.kz/bookView/view/?brId=${bookPath}&lang=kk`],
    directory: './temp',
    sources: [
      {selector: 'none', attr: 'none'}
    ],
    recursive: false,
    plugins: [ new MyPlugin() ]
  };

const dataGet = () => {
    fs.readFile('./temp/index.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        // using parser to get data fopm the file
        const $ = cheerio.load(data)

        // first script with global info
        const firstScr = $('script')
        console.log(firstScr.html())
        console.log(firstScr.text())
        
        // scond script with adress data
        const scrArr = [];
        const secScr = $('script').each(function(i, elem) {
            scrArr[i] = $(this).html();
        });
        scrArr.join(', ');
        const dataScr = scrArr[scrArr.length - 1]

        // Save address data to the file
        fs.appendFile('./temp.txt', dataScr, function (err) {
            if (err) throw err;
            // console.log('==> We got some parsed links, but not good enough - let us pozdorovatsya s bratkami', '\n');
        });

        // Trying to parce that hell
        fs.readFile('./temp.txt', function(err, data) {
            if(err) throw err;
            var dataParsArr = data.toString().split("\n");
            let newData = []

            for (i = 0; i < dataParsArr.length; i++) {
                let unit = ""
                let page = false
                let start = false
                let abort = false

                for (let j = 0; j < dataParsArr[i].length; j++) {
                    // console.log(dataParsArr[i][j]);
                    if (abort == true) {
                        break
                    } else if (page == true && start == true && dataParsArr[i][j] == '"') {
                        abort = true
                        break
                    } else if (page == true && start == true) {
                        unit = unit + dataParsArr[i][j]
                    } else if (dataParsArr[i][j] == 'p') {
                        page = true
                    } else if (dataParsArr[i][j] == '"') {
                        start = true
                    } 
                }
                
                if (unit.length > 50 ) {
                    newData.push('http://kazneb.kz' + unit)
                }

            }

            // console.log('Data', newData)
            console.log('==> We got parsed links, there are', newData.length, 'links! ', '\n');
            console.log('==> Natalya morskaya pehota!')

            // Downloading the pictures
            console.log('ok, da')
        
            const downOptions = {
                url: 'http://kazneb.kz/FileStore/dataFiles/02/37/1557843/content/0001.png?time=1595575185793&key=b2cd279feb58aaf73fd12cd55e32a07e',
                dest: './img/'                
              }
        
            download.image(downOptions)
                .then(({ filename }) => {
                console.log('Saved to', filename)
                })
                .catch((err) => console.error(err))
            
            
        });
        

    });


}

scrape(options).then((result) => {console.log('-== Making zhumaysinba great again... ==-', '\n', '\n','---------------------'), dataGet()});
console.log('')

// We got the data on this moment...

