var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

var WRAPPING_EXPORT = "\n\nmodule.exports = { JSZip: JSZip, JSZipBase64: JSZipBase64 };\n";
var files = [
  'jszip.js',
  'jszip-load.js',
  'jszip-deflate.js',
  'jszip-inflate.js'
];
var filePaths = [];
files.forEach(function(file) {
  var filePath = path.resolve(__dirname, '../src', file);
  filePaths.push(filePath);
});
var uglifyCommand = 'uglifyjs ';
uglifyCommand += filePaths.join(' ');
uglifyCommand += ' --beautify';

console.log("Building JSZip for component: %s", uglifyCommand);
console.log("Uglifying the JSZip files together");
exec(uglifyCommand, function(err, stdout, stderr) {
  console.log("Adding the export line for component");

  var output = stdout;
  output += WRAPPING_EXPORT;

  fs.writeFileSync('index.js', output);

  console.log("Build complete");
});
