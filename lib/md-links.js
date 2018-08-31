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
        // console.log(options);
        if (options.validate) { 
          validateLink(data).then((statusLinks) => {
            resolve(statusLinks);
          });
          // console.log('valido');
        } else { 
          resolve(data);
        }    
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
      let dataOfLinks = dataLine.map(markdown => {
        // console.log(markdown);
        const linePosition = (dataLine.indexOf(markdown) + 1);
        // console.log(dataLine.indexOf(element) + 1);
        return markdownLinkExtractor(file, markdown, linePosition); // retorna un arreglo   
      });  
      dataOfLinks = dataOfLinks.filter(element => 
        element.length !== 0
      );
      dataOfLinks = dataOfLinks.reduce((elementOne, elementTwo) => 
        elementOne.concat(elementTwo)
      );
      console.log(dataOfLinks);
      resolve(dataOfLinks);
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
function validateLink(links) {
  return new Promise((resolve, reject) => {
    let fetchStatus = [];
    links.forEach(element => {
      let url = element.href;
      fetchStatus.push(
        fetch(url).then(response => response
        ).then(data => {
          // console.log(element); // objeto con informacion
          element.status = data.status;
          element.statusTwo = data.statusText; 
          return element;
        }).catch(error => {
          console.error('ERROR > ' + error.status);
        }));      
    });
    // console.log(fetchStatus);
    Promise.all(fetchStatus).then((values) => {
      resolve(values);
    });
  });
};
module.exports = {
  mdLinks,
  readCompleteFile,
  validateTypeMarkdownFile
};
