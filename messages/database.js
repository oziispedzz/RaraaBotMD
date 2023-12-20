/* 

 - BASE ORI FAUZIDEV
 - ORI SCRIPT BY FAUZIDEV

*/

import {Low}  from "lowdb"
import { JSONFile } from "lowdb/node"
import yargs from 'yargs/yargs' 
import _ from 'lodash'

export default async function(){
const isNumber = x => typeof x === 'number' && !isNaN(x)

global.isNumber = isNumber
global.db = new Low(new JSONFile(`database/data/databases.json`))
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(conn), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
allcommand: [],
blockcmd: [],
banned: [],
antispam: [],
users: {},
game: {},
chats: {},
settings : {},
others: {},
...(global.db.data || {})
}
global.db.chain = _.chain(global.db.data)
}
await loadDatabase()


if (global.db.data) await global.db.write()  

}//akhir dari export default