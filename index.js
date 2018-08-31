#!/usr/bin/env node

let mdlinks = require('./lib/md-links');
// grab provided args
let [,, ...args] = process.argv;

mdlinks.mdLinks(args[0]).then((links) => {
  links.forEach(element => {
    console.log(element.href + ':' + element.line + ' ' + element.text + ' ' + element.path);
  });
});
