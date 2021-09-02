const fs = require('fs');

//var read = fs.readFileSync('./extracao.txt',{encoding:'utf-8'});

const regex = /(?:^(?:[\w\sÁ-ú]+[,|.](?:(?:[\w\sÁ-Ú]+)[.,]|[,;])))(?:[\w\sÁ-ú]+(?:[\w\sÁ-ú:]*)[.])(?:.+)(?:\d{4}[.]{0,1})/gms;
const regesp  = /\r\n/gm;
const ano = /\d{4}[.,]/gm;
exports.formata = function (textointerio) {
    var match = regex.exec(textointerio); 
    //console.log(match)

    // todas as biografias
    var output=match[0];
    var rest = output.replace(regesp,"");
    //console.log(output);
    //console.log(rest);
    var refvet=[];

    var stringst = 0;
    while ((matchx = ano.exec(rest)) !== null) {
        // console.log(`Encontrou ${matchx[0]} início=${matchx.index} fim=${ano.lastIndex}.`);
        if(matchx[0]<2021)
            refvet.push(rest.slice(stringst,ano.lastIndex));
        stringst = ano.lastIndex;
        
    }
    return refvet;
}

/*
refvet.forEach(dislay);

function dislay(element,index) {
    console.log(element);
}
*/
