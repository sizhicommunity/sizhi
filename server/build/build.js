const shell = require('shelljs')

shell.cd('../front')
shell.exec('npm run build')
shell.cp( './dist/*.*', '../server/www')

// shell.cd('../server')
// shell.exec('npm start')