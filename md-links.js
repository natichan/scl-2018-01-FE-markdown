const path = require("path");

function testingPath(a){ 

    console.log(path.resolve(a))
}

module.exports = {
    testingPath
}