/*
 * Node program to turn markdown file into html file
 */

const marked = require('marked');
const fs = require('fs');

const readMe = fs.readFileSync('./src/content/README.md', 'utf-8');
const markdownReadMe = marked(readMe);

fs.writeFileSync('./src/content/README.html', markdownReadMe);
