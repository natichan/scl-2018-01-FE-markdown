const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const color = require('colors');
const Marked = require('marked');

function convertToAbsolutePath(pathFile) {
  return new Promise((resolve, reject) => {
    const filesAllow = '.md'; // declaro archivos permitidos
    const extension = (pathFile.substring(pathFile.lastIndexOf('.')).toLowerCase()); // divide para comprobar desde el punto en adelante el tipo de extension
    if (filesAllow !== extension) reject('Debes ingresar un archivo de tipo' + filesAllow);
    if (resolve) 
      absolutePath = path.resolve(pathFile); // convierte la ruta a absoluta
    return (readCompleteFile(absolutePath));
  }); 
}
/* function validateTypeMarkdownFile(pathFile) {
  const filesAllow = '.md'; // declaro archivos permitidos
  const extension = (pathFile.substring(pathFile.lastIndexOf('.')).toLowerCase()); // divide para comprobar desde el punto en adelante el tipo de extension
  if (filesAllow === extension) {
    // console.log('Archivo permitido');
    readCompleteFile(pathFile);
  } else {
    console.log('Solo son permitidos archivos de tipo' + filesAllow);
  }
} */
function readCompleteFile(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
      let dataLine = data.split('\n');
      // console.log(dataLine);
      let dataExtractLine = dataLine.map(element => {
      // console.log(element);
        const linePosition = (dataLine.indexOf(element) + 1);
        // console.log(dataLine.indexOf(element) + 1);
        return markdownLinkExtractor(pathFile, element, linePosition);    
      });  
      dataExtractLine = dataExtractLine.filter(element => element.length !== 0);
      dataExtractLine = dataExtractLine.reduce((elementOne, elementTwo) => elementOne.concat(elementTwo));
      console.log(dataExtractLine);
    });
  });
}
function markdownLinkExtractor(pathFile, markdown, position) {
  const links = [];
  const renderer = new Marked.Renderer();
  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
      line: position,
      path: pathFile
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
      line: position,
      path: pathFile

    });
  };
  Marked(markdown, {renderer: renderer});
  // validateLink(links);
  // console.log(links);
  return links;
};

function validateLink(links) {
  links.forEach(element => {
    let url = element.href;
    fetch(url).then(response => response
    ).then(data => {
      /*  console.log(data.url.blue);
      console.log(data.status);
      console.log(data.statusText.yellow); */
    }).catch(error => {
      console.error('ERROR > ' + error.status);
    });
  });
}
module.exports = {
  convertToAbsolutePath
};
