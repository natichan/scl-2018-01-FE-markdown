const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const Marked = require('marked');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const validateExtension = validateTypeMarkdownFile(path);
    // console.log(validateExtension);
    if (validateExtension) {
      const absolutePath = convertToAbsolutePath(path);
      // console.log(absolutePath);
      processAndExtractFile(absolutePath).then((data) => {
        resolve(data);        
      });
    } else {
      reject('Archivo no válido');
    }
  });
};
function validateTypeMarkdownFile(pathFile) {
  const filesAllow = '.md'; // declaro archivos permitidos
  const extension = (pathFile.substring(pathFile.lastIndexOf('.')).toLowerCase()); // divide para comprobar desde el punto en adelante el tipo de extension
  if (filesAllow !== extension) {
    console.log('Solo son permitidos archivos de tipo markdown(md)');
  } else {
    // console.log('Archivo permitido');
    return true;
  }
}
function convertToAbsolutePath(pathFile) {
  absolutePath = path.resolve(pathFile); // convierte la ruta a absoluta
  // console.log(absolutePath);
  return absolutePath;
}; 
function readCompleteFile(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
function processAndExtractFile(file) {
  return new Promise((resolve, reject) => {
    readCompleteFile(file).then((data) => {
      let dataLine = data.split('\n');
      // console.log(dataLine);
      let dataExtractLine = dataLine.map(markdown => {
      // console.log(element);
        const linePosition = (dataLine.indexOf(markdown) + 1);
        // console.log(dataLine.indexOf(element) + 1);
        return markdownLinkExtractor(file, markdown, linePosition); // retorna un arreglo   
      });  
      dataExtractLine = dataExtractLine.filter(element => 
        element.length !== 0
      );
      dataExtractLine = dataExtractLine.reduce((elementOne, elementTwo) => 
        elementOne.concat(elementTwo)
      );
      // console.log(dataExtractLine);
      resolve(dataExtractLine);
    });
  });
};
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
  // console.log(links);
  return links;
};
/* function validateLink(links) {
  return new Promise((resolve, reject) => {
    links.forEach(element => {
      let url = element.href;
      fetch(url).then(response => response
      ).then(data => {
        resolve(data);
        // console.log(data.status + ' ' + data.statusText);
      }).catch(error => {
        console.error('ERROR > ' + error.status);
      });
    });
  });
} */
module.exports = {
  mdLinks,
  readCompleteFile,
  validateTypeMarkdownFile
};
