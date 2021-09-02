const { Poppler } = require("node-poppler");
const poppler = new Poppler("/usr/bin");


//const file = 'e.pdf';
//const outputFile = `test`;
const options = {
	firstPageToConvert: 1,
	lastPageToConvert: 2,
	pngFile: true,
};

exports.pdf2image = async function (file, outputFile) {
	try{
		const res = poppler.pdfToCairo(file, outputFile, options);
		console.log("input ="+file+"\n output ="+outputFile);
		return res;
	}catch(error){
		return "error"+error;
	}
}






