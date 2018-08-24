#!/usr/bin/env node

let mdlinks = require('./md-links')
// grab provided args
let [,, ...args] = process.argv;

mdlinks.testingPath(args[0]);

