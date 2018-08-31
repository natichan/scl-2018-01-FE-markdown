#!/usr/bin/env node

let mdlinks = require('./lib/md-links');
// grab provided args
let [,, ...args] = process.argv;
let options = {};

if (args.includes('--validate')) options.validate = true;

mdlinks.mdLinks(args[0], options).then((links) => { 
  if (options.validate) {
    console.log(links);
  } else { 
    links.forEach(element => {
      console.log(element.path + ':' + element.line + ' ' + element.href + ' ' + element.text);
    });
  }
}).catch((error) => {
  console.log('Error >' + error);
});

