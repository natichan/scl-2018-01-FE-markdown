#!/usr/bin/env node

let mdlinks = require('./lib/md-links');
// grab provided args
let [,, ...args] = process.argv;
let options = {};
if (args.includes('--validate')) options.validate = true;

mdlinks.mdLinks(args[0], options).then((links) => {
  if (options.validate) {
    links.forEach(element => {
      console.log(element.path.green + ':' + element.line + ' ' + element.href + ' ' + element.status + ' ' + element.statusTwo + ' ' + element.text);      
    });
  } else { 
    links.forEach(element => {
      console.log(element.path.green + ':' + element.line + ' ' + element.href + ' ' + element.text);
    });
  }
}).catch((error) => {
  console.error('Error >' + error);
});
