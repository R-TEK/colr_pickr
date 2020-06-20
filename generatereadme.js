/*
 * Node program to turn markdown file into html file
 */

const marked = require('marked');
const fs = require('fs');

const readMe = fs.readFileSync('./src/README.md', 'utf-8');
const markdownReadMe = marked(readMe);

fs.writeFileSync('src/html/README.html', markdownReadMe);
