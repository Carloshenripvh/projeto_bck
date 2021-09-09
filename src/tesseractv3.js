const { text } = require('express');
const { createWorker } = require('tesseract.js');
const fs = require('fs');

const worker = createWorker(
  {
  logger: m => console.log(m), // Add logger here
  }
);

exports.recognize = async function (dir, file) {
    await worker.load();
    await worker.loadLanguage('por+por2+eng');
    await worker.initialize('por+por2+eng');
    let { data: { text } } = await worker.recognize(dir +file);
    // const { data: { text } } = await worker.recognize(dir+'/'+file);
   // console.log(text);

    await worker.terminate();
    return text;
}