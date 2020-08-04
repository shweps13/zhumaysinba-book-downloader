const fs = require('fs-extra');
const PDFDocument = require('pdfkit'); // pdf creator

var files = [];

let pdfData = fs.readFileSync('pdfData.txt', 'utf8').split('\n')
pdfData.pop(pdfData.length - 1)

console.log('====================')
console.log('==> Ok, we have', pdfData.length, 'pages to move into PDF', '\n')

if (!fs.existsSync('./pdf')){   
    fs.mkdirSync('./pdf');
}

const createPDF = (addr, num) => {
    const doc = new PDFDocument();  //starting new pdf here

    doc.pipe(fs.createWriteStream(`./pdf/output${num}.pdf`));
    files.push(`./pdf/output${num}.pdf`);
    doc.image(addr, 5, 5, {fit: [580, 830], align: 'center', valign: 'center'})
    doc.end();

}

for (i = 0; i < pdfData.length; i++) {
    createPDF(pdfData[i], (i+1))
}


if (!fs.existsSync('./ready')){   
    fs.mkdirSync('./ready');
}

const merge = require('easy-pdf-merge');

merge(files,`./ready/ready.pdf`,function(err){
  if(err) {
    return console.log(err)
  }

  console.log('Success, now deleting files')

  try {
    fs.unlinkSync('./pdf')
    fs.unlinkSync('./img')
    fs.unlinkSync('./temp')        
  } catch(err) {
    console.error(err)
  }

  console.log('Success')
});