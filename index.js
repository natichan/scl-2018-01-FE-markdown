#!/usr/bin/env node

let mdlinks = require('./lib/md-links');
// grab provided args
let [,, ...args] = process.argv;

mdlinks.readCompleteFile(args[0]);