module.exports = {
    testingPath,
}

const path = require('path'); // console.log(path);
const fs = require('fs');

function testingPath(a){
    const absolutePath = path.resolve(a); //convierte la ruta a absoluta
    fs.readFile( absolutePath, 'utf-8', (err, data) => {
        if(err) throw err;
        console.log(data);   
    })
    console.log(absolutePath) 
}