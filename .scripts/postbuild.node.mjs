import fs from 'fs';

const indexHtml = fs.readFileSync('dist/laurenz-dev/browser/index.html').toString();
const htAccess = fs.readFileSync('dist/laurenz-dev/browser/.htaccess').toString();

let hashes = [...indexHtml.matchAll(/<script .*?integrity="(sha\d{3}-.*?)"><\/script>/g)].map(
  (hash) => `'${hash[1]}'`,
);

let htAccessNew = htAccess.replaceAll('<auto-hashes>', hashes.join(' '));

fs.writeFileSync('dist/laurenz-dev/browser/.htaccess', htAccessNew);
