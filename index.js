#!/usr/bin/env node

let mdlinks = require('./md-links');
// grab provided args
let [,, ...args] = process.argv;

mdlinks.convertToAbsolutePath(args[0]);