/**
 * demo
 */
const fs = require('fs');

/*var contents = fs.readFileSync("demo1.txt", "utf8");
console.log(contents);
console.log("2");*/

fs.readFile("demo1.txt", "utf8", function(err, contents) {
    if(err) {
        errorHandler();
    }
    console.log(contents+"sdsdsd");
});
console.log("2");
