const tesseract = require('./src/tesseractv3');
const poppler = require('./src/poppler');
const regex = require('./src/regex');
const mysql = require('./mysql');
const imgdir = './pdfimg/';
const fs = require('fs');



exports.extract = async function (filename,delpdf,noregex) {
    //  fs.readdirSync(testFolder).forEach(file => {
    //      var pr = await poppler.pdf2image('/pdfs/'+file,'/pdfimg/'+file)
    //  });

    //  nome do arquivo sem formato .pdf , exmp -> 122.pdf para 122 , usado para achar o diretorio 
    var pdftoimg = filename.toString();
    pdftoimg = pdftoimg.replace(".pdf","");
    // Certas Funcoes possuem (AWAIT), pos demais funcoes necessitam do dado anteriorm , Resto do Codigo vai esperar a funcao termina
    // 1 - Renderizar Paginas do pdf como imagem , Possui (AWAIT)
    // **** Poppler *****
    try{
        // Cria diretorio para cada pdf enviado -- caso pdf tenha mais de uma imagem
        if (!fs.existsSync('./pdfimg/'+pdftoimg)){
            fs.mkdirSync('./pdfimg/'+pdftoimg, { recursive: true });
        }
        // extrai imagens do pdf
         var pr = await poppler.pdf2image(__dirname+'/upload/'+filename,__dirname+'/pdfimg/'+ pdftoimg+'/'+pdftoimg);
        //var pr = await poppler.pdf2image('upload/'+filename, 'pdfimg/'+ pdftoimg+'/'+pdftoimg);
        console.log('Extraindo Imagens'+(await pr).toString);

        // Deletar PDF pois ja foi extraido img
        if(delpdf){
            if  (fs.existsSync('./upload/'+filename)){
                fs.unlink('./upload/'+filename, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
        }
        // Fim da Função
    }
    catch(e){
        return "Error ao gerar imagens" + e;
    }

    // 2- Vetor com Todas Imagem de um pdf 
    var pdfvet=[];
    // 2.1 cria lista de todas imagens geradas pelo pdf, ** Caso seja trabalhado varias paginas **
    
    fs.readdirSync('./pdfimg/'+pdftoimg).forEach(file => {
	    pdfvet.push(file);
    });
    console.log(pdfvet);
    // *********************
    // 3 - Reconhecimento dos texto de forma Recursiva , Possui (AWAIT)
    // ***** Tesseract *******
    try{
        for(var i =0; i < pdfvet.length; i++)
            texto = await tesseract.recognize('./pdfimg/'+pdftoimg + '/', pdfvet[i]);

        if(texto.length < 10){
            console.log("Erro na Extracao do texto");
        }else{
            // caso nao queria aplicar regex
            if(noregex){
                console.log(texto);  
            }else{
                // aplicacao do regex
                var refbib_vet = regex.formata(texto);
                if(refbib_vet !=null){
                    try{
                        // insere as informacoes no banco de dados
                        refbib_vet.forEach(dislay);
                        function dislay(element,index) {
                        console.log("etrc = "+ element +"\n");
                        //mysql.insert(element);
                    }
                    }catch(err){
                        console.log("Falha na Insersão no BD: "+err)
                    }
                }else {
                    console.log("Falha no Regex , Retornando Todo Reconhecimento :"+ texto);
                }
            }// aplicacao do regex
            }
    }catch(e){
        console.log('Erro no Processamento :'+e);
    }
    // ************

}
