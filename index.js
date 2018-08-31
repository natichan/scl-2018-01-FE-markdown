#!/usr/bin/env node

let mdlinks = require('./lib/md-links');
// grab provided args
let [,, ...args] = process.argv;
let options = {};

if (args.includes('--validate')) options.validate = true;

mdlinks.mdLinks(args[0], options).then((links) => {
  links.forEach(element => {
    console.log(element.href + ':' + element.line + ' ' + element.text + ' ' + element.path);
  }).catch((error) => {
    console.log('Error >' + error);
  });
});
