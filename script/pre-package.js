const fs = require('fs');

// relatived to root path of project
const build = 'build';
fs.rmdirSync(build, {
    recursive: true,
});
fs.mkdirSync(build);