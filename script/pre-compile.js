const fs = require('fs');

// relatived to root path of project
const build = 'out';
if (fs.existsSync(build)) {
    fs.rmSync(build, {
        recursive: true,
    });
}
fs.mkdirSync(build);