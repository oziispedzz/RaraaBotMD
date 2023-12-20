import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone'
import acrcloud from 'acrcloud'

import { dtb } from '../database/index.js'
import { Plugins } from '../lib/handler.js'
import { createRequire } from 'module'

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const require = createRequire(import.meta.url)
const version = require("@whiskeysockets/baileys/package.json").version 

global.apikey = ''; //apikey https://api.betabotz.org
global.keyai = '';
global.Fauzi = "https://api-fauzidev.cyclic.app"

global.mess = {
  wait: 'Loading...',
  done: 'here you go',
  owner: 'Fitur Khusus Owner Bot!!',
  admin: 'Fitur Khusus Admin Group',
  botAdmin: 'Bot Bukan Admin!!',
  group: 'Fitur Khususs Group',
  private: 'Fitur Khusus Private Chat',
  endlimit: 'Limit Kamu Habis',
  error: {
    api: "Terjadi Kesalahan Silahkan Coba Lagi Nanti",
    lv: "Terjadi Kesalahan"
  },
};

global.react = {
  wait: '🕒',
  done: '✅',
  error: '❌',
};

global.z1 = ``;
global.z2 = `•`;
global.z3 = ``;
global.z4 = `•`;

global.pp_bot = ``;
global.qoted = ``;
global.thumb = fs.readFileSync('./src/thumb.jpg')
global.gaboleh = fs.readFileSync('./src/gaboleh.jpg')
global.imgreply = fs.readFileSync('./src/reply.jpeg')
global.vidmenu = fs.readFileSync('./src/menu.mp4')

global.acr = new acrcloud({
host: 'identify-ap-southeast-1.acrcloud.com',
access_key: 'c0ae6133ab9589776b3b285922ca837c',
access_secret: 'jdGwtCiD7VTZwz0t66zRILghkLrFeK2sjY2JHLKS'
})

global.addSpammer = function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
_db[position].spam += 1
 } else {
let bulin = ({ id: jid, spam: 1 })
 _db.push(bulin)     
}
}


global.userLimit = {
  premium: 'Unlimited',
  free: 15,
};

//HARGA BARANG DI RPG
global.Hberlian = 10000000
global.Hgold = 50000
global.Hiron = 35000
global.Hayam = 20000
global.Hkelinci = 30000
global.Hsapi = 100000000
global.Hkambing = 5000000

//SETTINGS
global.owner = dtb.config.ownerNumber
global.antiSpam = true;
global.public = dtb.config.isPublic
global.baileysVersion = `Baileys ${version}`;
global.totalPlugins = Plugins.commands.size



//MENUNYA
global.help = {
menu(prefix, sender, baileysVersion, runtime, totalFitur, isCreator, botz, userr, user) {
return `
*Hi @${sender.split("@")[0]}* \nI'm *${dtb.config?.botName[0]}* to help you

${z4} Date :  ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
${z4} Time :  ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB
${z4} Uptime :  ${runtime(process.uptime())}
${z4} Feature :  ${totalFitur()} Case ${Plugins.commands.size} Plugins
${z4} User : ${Object.keys(db.data.users).length}
`+ readmore +`
*MAIN MENU*
${z2} ${prefix}sc
${z2} ${prefix}owner
${z2} ${prefix}runtime
${z2} ${prefix}daftar
${z2} ${prefix}unreg
${z2} ${prefix}ceksn
${z2} ${prefix}report
${z2} ${prefix}ping

*AI / CHATGPT*
${z2} ${prefix}ai
${z2} ${prefix}simi
${z2} ${prefix}rara
${z2} ${prefix}fauzi
${z2} ${prefix}simivoice
${z2} ${prefix}raravoice
${z2} ${prefix}fauzivoice 
${z2} ${prefix}bard
${z2} ${prefix}miku
${z2} ${prefix}nino
${z2} ${prefix}paimon
${z2} ${prefix}klee
${z2} ${prefix}erza
${z2} ${prefix}luffy
${z2} ${prefix}robin
${z2} ${prefix}midjourney
${z2} ${prefix}txt2img

*DOWNLOADER*
${z2} ${prefix}tiktok
${z2} ${prefix}ttmp3
${z2} ${prefix}ytmp3
${z2} ${prefix}ytmp4
${z2} ${prefix}git

*TOOLS*
${z2} ${prefix}play
${z2} ${prefix}stiker
${z2} ${prefix}swm
${z2} ${prefix}smeme
${z2} ${prefix}ssweb
${z2} ${prefix}attp
${z2} ${prefix}translate
${z2} ${prefix}ocr
${z2} ${prefix}kalkulator
${z2} ${prefix}whatmusic
${z2} ${prefix}remini
${z2} ${prefix}color
${z2} ${prefix}hdr

*INTERNET*
${z2} ${prefix}spotify 
${z2} ${prefix}ytsearch
${z2} ${prefix}pinterest
${z2} ${prefix}liriklagu
${z2} ${prefix}apksearch
${z2} ${prefix}vidgalau
 
*OWNER*
${z2} ${prefix}restart
${z2} ${prefix}clearsesi
${z2} ${prefix}sendcmd
${z2} ${prefix}public
${z2} ${prefix}self
${z2} ${prefix}getcase
${z2} ${prefix}addlimit
${z2} ${prefix}ubahreply
${z2} ${prefix}creategc
${z2} ${prefix}leavegc
${z2} ${prefix}addowner
${z2} ${prefix}delowner
${z2} ${prefix}listblock
${z2} ${prefix}block
${z2} ${prefix}unblock
${z2} ${prefix}>
${z2} ${prefix}$

*GROUP*
${z2} ${prefix}kick
${z2} ${prefix}add
${z2} ${prefix}setppgc
${z2} ${prefix}setsubject
${z2} ${prefix}setdesc
${z2} ${prefix}tagadmin

*OTHER*
${z2} ${prefix}couple
${z2} ${prefix}tozombie
${z2} ${prefix}menfes
${z2} ${prefix}balasmenfess
${z2} ${prefix}tolakmenfess
${z2} ${prefix}stopmenfess

*ANIME*
${z2} ${prefix}otakusearch
${z2} ${prefix}quotesanime
${z2} ${prefix}randomanime
${z2} ${prefix}cosplay
${z2} ${prefix}neko
${z2} ${prefix}whatanime

*PHOTOOXY*
${z2} ${prefix}flaming
${z2} ${prefix}naruto
${z2} ${prefix}pubg
${z2} ${prefix}shadowsky

─• *PLUGINS MENU* •─`
}
}