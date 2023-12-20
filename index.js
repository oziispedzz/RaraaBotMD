
/* 

 - BASE ORI FAUZIDEV
 - ORI SCRIPT BY FAUZIDEV

*/

console.log('Memulai...')

import yargs from 'yargs'
import path from 'path'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { createRequire } from 'module'
import { createInterface } from 'readline'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import { spawn } from 'child_process'
import { platform } from "os";

// https://stackoverflow.com/a/50052194
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/


/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start() {
  var isRunning = false;
  let args = [path.join(__dirname, 'start.js'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...args].join('\n'))
   let p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
      switch (data) {
      case "reset": {
        platform() === "win32" ? p.kill("SIGINT") : p.kill();
        isRunning = false;
        start.apply(this, arguments);
        console.log("[System] Restarting bot...");
      };
      break;
      case "uptime": {
        p.send(process.uptime());
      };
      break;
   }; 
      })
   .on('exit', code => {
         console.error('Exited with code:', code)
         if (code == '.' || code == 1 || code == 0) start()
      })
}

start()

