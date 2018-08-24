module.exports = {
    testingPath,
}

const path = require('path'); // console.log(path);
const fs = require('fs');
const fetch = require('node-fetch');

function testingPath(a){
    const absolutePath = path.resolve(a); //convierte la ruta a absoluta
    readCompleteFile(absolutePath);
    //console.log(absolutePath) 
}
function readCompleteFile (a){
    fs.readFile( a, 'utf-8', (err, data) => {
        if(err) throw err;
        console.log(data);   
    })
}
/* fetch('https://www.google.cl/').then((response) => {
    console.log(response);
}) */