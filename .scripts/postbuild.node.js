const fs = require('fs');

const indexHtml = fs.readFileSync('dist/laurenz-dev-reboot-new/index.html').toString();
const htAccess = fs.readFileSync('dist/laurenz-dev-reboot-new/.htaccess').toString();

let hashes = [...indexHtml.matchAll(/<script .*?integrity="(sha\d{3}-.*?)"><\/script>/g)].map(
  (hash) => `'${hash[1]}'`,
);

let htAccessNew = htAccess.replaceAll('<auto-hashes>', hashes.join(' '));

fs.writeFileSync('dist/laurenz-dev-reboot-new/.htaccess', htAccessNew);
