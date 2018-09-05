const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const Marked = require('marked');
const color = require('colors');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const validateExtension = validateTypeMarkdownFile(path);
    if (validateExtension) {
      const absolutePath = convertToAbsolutePath(path);
      processAndExtractFile(absolutePath).then((data) => {
        if (options.validate) { 
          validateLink(data).then((statusLinks) => {
            resolve(statusLinks);
          });
        } else { 
          resolve(data);
        }
      }).catch((error) => {
        console.log('Error >' + error);
      });
    } else {
      reject('Archivo no válido');
    }
  });
};
function validateTypeMarkdownFile(pathFile) {
  const filesAllow = '.md'; 
  const extension = (pathFile.substring(pathFile.lastIndexOf('.')).toLowerCase());
  if (filesAllow !== extension) {
    console.log('Solo son permitidos archivos de tipo markdown(md)');
  } else {
    return true;
  }
}
function convertToAbsolutePath(pathFile) {
  absolutePath = path.resolve(pathFile); 
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
function processAndExtractFile(pathFile) {
  return new Promise((resolve, reject) => {
    readCompleteFile(pathFile).then((data) => {
      let dataSplit = data.split('\n');
      let dataOfLinks = dataSplit.map(element => {
        const linePosition = (dataSplit.indexOf(element) + 1);
        return markdownLinkExtractor(pathFile, element, linePosition); // retorna un arreglo   
      });  
      dataOfLinks = dataOfLinks.filter(element => 
        element.length !== 0
      );
      dataOfLinks = dataOfLinks.reduce((elementOne, elementTwo) => 
        elementOne.concat(elementTwo)
      );
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
  return links;
};
function validateLink(links) {
  return new Promise((resolve, reject) => {
    let fetchStatus = [];
    links.forEach(element => {
      let url = element.href;
      fetchStatus.push(
        fetch(url).then(data => {
          element.status = data.status;
          element.statusTwo = data.statusText.blue; 
          return element;
        }).catch(error => { 
          console.error('ERROR > ' + error);
          return element;
        }));      
    });
    Promise.all(fetchStatus).then((values) => {
      resolve(values);
      if (links === 0) reject('No se encontraron links');
    });
  });
};
module.exports = {
  mdLinks,
  readCompleteFile,
  validateTypeMarkdownFile
};