const shell= require( 'shelljs')

shell.cp('-R', '../server/dist','./server-app')
shell.cp('-R', '../server/www','./server-app')
shell.cp('-RL', '../server/node_modules','./server-app')
