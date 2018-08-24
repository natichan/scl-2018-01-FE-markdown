module.exports = {
    testingPath,
}

const path = require('path'); // console.log(path);
const fs = require('fs');
// const fetch = require('node-fetch');

function testingPath(a){
    const absolutePath = path.resolve(a); //convierte la ruta a absoluta
    validateTypeMarkdownFile(absolutePath)
    //console.log(absolutePath) 
}
function validateTypeMarkdownFile(a){
    filesAllow = '.md'; // declaro archivos permitidos 
    extension = (a.substring(a.lastIndexOf('.')).toLowerCase()); // divide para comprobar desde el punto en adelante el tipo de extension
    if(filesAllows === extension){
        console.log('Archivo permitido');
        readCompleteFile(a);
    }else{
        console.log('Solo son permitidos archivos de tipo' + filesAllow);       
    }
}
function readCompleteFile (a){
    fs.readFile( a, 'utf-8', (err, data) => {
        if(err) throw err;
        // console.log(data);   
    })
}
/* fetch('https://www.google.cl/').then((response) => {
    console.log(response);
}) */