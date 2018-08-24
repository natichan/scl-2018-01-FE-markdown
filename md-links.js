const path = require('path'); // console.log(path);
const fs = require('fs');
// const fetch = require('node-fetch');
function readCompleteFile(a) {
  fs.readFile(a, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

function validateTypeMarkdownFile(a) {
  const filesAllow = '.md'; // declaro archivos permitidos
  const extension = (a.substring(a.lastIndexOf('.')).toLowerCase()); // divide para comprobar desde el punto en adelante el tipo de extension
  if (filesAllow === extension) {
    console.log('Archivo permitido');
    readCompleteFile(a);
  } else {
    console.log('Solo son permitidos archivos de tipo' + filesAllow);
  }
}
function testingPath(a) {
  const absolutePath = path.resolve(a); // convierte la ruta a absoluta
  validateTypeMarkdownFile(absolutePath);
  // console.log(absolutePath)
}

// Es necesario que instales marked como dependencia de tu proyecto
// npm install --save marked
const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
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
      title: title
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title
    });
  };
  Marked(markdown, {renderer: renderer});
  return links;
};
/* fetch('https://www.google.cl/').then((response) => {
    console.log(response);
}) */
module.exports = {
  testingPath
};
