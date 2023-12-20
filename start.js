
/* 

 - BASE ORI FAUZIDEV
 - ORI SCRIPT BY FAUZIDEV

*/

//import "./messages/case.js";
import newWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore, 
  downloadContentFromMessage,
  PHONENUMBER_MCC,
  jidNormalizedUser,
  delay,
  Browsers,
  getContentType,
  jidDecode
} from "@whiskeysockets/baileys";


import axios from 'axios';
import pino from 'pino';
import { fileURLToPath } from "url";
import { Boom } from '@hapi/boom';
import readline from "readline";
import { parsePhoneNumber } from "libphonenumber-js";
import NodeCache from "node-cache";
import path from "path";
import { join, dirname } from 'path'
import FileType from 'file-type';
import fs, { readFileSync } from 'fs';
import chalk from 'chalk';
import express from 'express';
import PhoneNumber from "awesome-phonenumber";
import { createRequire } from 'module'

let require = createRequire(import.meta.url) 
global.require = require

import { dtb } from './database/index.js'
import { FauziDev } from './messages/case.js'
import {
  smsg,
  getBuffer,
  fetchJson, 
  TelegraPh 
} from './lib/simple.js'
import {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif
} from "./lib/exif.js"
import { 
  toAudio, 
  toPTT, 
  toVideo 
} from "./lib/converter.js"

const phoneNumber = dtb.config?.pairingNumber[0];
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const store = makeInMemoryStore({ 
  logger: pino({ 
    level: "silent", 
    stream: "store" 
  })
});

const __dirname = dirname(fileURLToPath(import.meta.url))

function nocache(module, cb = () => { }) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
} 

function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
}
catch (e) {
reject(e)
}
})
}


let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})

global.calender = calender;

async function WAConnection() {
  await(await import("./messages/database.js")).default()
  const { version, isLatest } = await fetchLatestBaileysVersion()
  const {  state, saveCreds } =await useMultiFileAuthState(`./database/session`)
  const msgRetryCounterCache = new NodeCache()
  const conn = newWASocket.default({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !pairingCode,
    mobile: useMobile,
    browser: ['Chrome (Linux)', '', ''],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid)
      let msg = await store.loadMessage(jid, key.id)
      return msg?.message || ""
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });
  
  await(await import("./messages/case.js"))
  nocache("./messages/case.js", (module) => console.log(` "${module}" Telah diupdate!`));
  
  store?.bind(conn.ev);
  
// BASE ORI MISAKI (Fauzidev)
// YT : https://youtube.com/@fauzijayawardana
/*
Di Buat : Fauzidev
©Rarabot MD 2023

 * ig: @fauzijywrdna
 * yt: @fauzijayawardana
 * gh: @oziispedzz

Jangan di hapus creatornya kack
Saya capek ngetik kode 

"Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
(QS ash-Shaff: 2-3).
*/
  
  if(pairingCode && !conn.authState.creds.registered) {
    if(!!phoneNumber) {
        if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: +628xxxx`)));
        process.exit(0);
      };
    } else {
      phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number \nFor example: +628xxxx : `)));
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
      if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: +628xxxx`)));
        phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number \nFor example: +628xxxx : `)));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        rl.close();
      };
    }
    setTimeout(async () => {
    let code = await conn.requestPairingCode(phoneNumber);
      code = code?.match(/.{1,4}/g)?.join("-") || code;
      console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)));
    }, 3000);
  }
  conn.ev.process(async (events) => {
    if(events["connection.update"]) {
      const update = events["connection.update"];
      const { connection } = update;
      if(connection === 'close') {
        console.log(chalk.red('Connection Closed: Reconnecting...'));
        await WAConnection();
      } else if(connection === 'open') {
        console.log(
        chalk.black(chalk.bgWhite('Connected to: ')),
        chalk.black(chalk.bgGreen(conn.user.id.split(":")[0]))
        );
        const creds = fs.readFileSync('./database/session/creds.json');
        await delay(1000 * 2) 
        const replied = await conn.sendMessage(conn.user.id, { document: creds, mimetype: `application/json`, fileName: `creds.json` })
        await conn.sendMessage(conn.user.id, { text: `Ini adalah file Sesi anda, Jangan bagikan file ini dengan siapa pun.` }, { quoted: replied });
      }
    }
    if(events["creds.update"]) {
      await saveCreds();
    }
    //Reject call
    if(events["call"]) {
      const m = events["call"][0];
      if(m.status == "offer") {
        conn.rejectCall(m.id, m.from);
      }
    }
    //recive a new messages 
    if(events['messages.upsert']) {
      const chatUpdate = events['messages.upsert']
      if (global.db.data) await global.db.write() 
      if (!chatUpdate.messages) return;
      let m = chatUpdate.messages[0] || chatUpdate.messages[chatUpdate.messages.length - 1]
      if (!m.message) return
      if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
      m = await smsg(conn, m, store) 
      FauziDev(conn, m, chatUpdate,store)
      }
    //Member Update  
    if(events['group-participants.update']) {
      const anu = events['group-participants.update']
      if (global.db.data == null) await loadDatabase()
      console.log(anu)
      try {
        let metadata = await conn.groupMetadata(anu.id);
        let participants = anu.participants;
          for (let num of participants) {
          var bg = `https://telegra.ph/file/693937ad61381deec1b93.jpg`
          let ppuser2 = `https://telegra.ph/file/24fa902ead26340f3df2c.png`
          let nameUser = await conn.getName(num)
          let membr = metadata.participants.length 
          let wlc = `https://api.popcat.xyz/welcomecard?background=${bg}&text1=WELCOME&text2=+${nameUser}&text3=Member+${membr}&avatar=${ppuser2}`
          let lefts = `https://api.popcat.xyz/welcomecard?background=${bg}&text1=GOODBYE&text2=+${nameUser}&text3=Member+${membr}&avatar=${ppuser2}`
            if ( anu.action === 'add' ) {
              await conn.sendMessage(anu.id, { image: { url: wlc }, caption: `✧━━━━━[ *WELCOME* ]━━━━━✧\n\nHello @${num.split("@")[0]} Welcome To *${metadata.subject}*\n\n${dtb.config.description}`, mentions: [num] })
            } else if ( anu.action === 'remove' ) {
              await conn.sendMessage(anu.id, { image: { url: lefts }, caption: `✧━━━━━[ *GOOD BYE* ]━━━━━✧\n\nGoodbye @${num.split("@")[0]} I Hope You Don't Come Back\n\n${dtb.config.description}`, mentions: [num]}) 
            } else if ( anu.action === 'promote' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `@${num.split("@")[0]} Congratulations, Now you are a Group Admin` })
            } else if ( anu.action === 'demote' ) {
              conn.sendMessage(anu.id, { mentions: [num], text: `@${num.split("@")[0]} Hahaha You are in demote` })
            }
          }
      } catch (err) {
      console.log(`ERROR DIBAGIAN ` + err)
    }
    }

    //Group Update  
    if(events['groups.update']) {
      const anu = events['groups.update']
      console.log(anu)
    }

    })
 
  //SETTING
  conn.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
        return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }
  
  conn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
  
  //CREATED BY FAUZIDEV
   conn.sendText = (jid, text, quoted = "", options) =>
    conn.sendMessage(jid, { text: text, ...options, }, { quoted,...options, }
    );
    
   conn.getName = (jid, withoutContact = false) => {
    let id = conn.decodeJid(jid);
    withoutContact = conn.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === conn.decodeJid(conn.user.id)
          ? conn.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };
  
  conn.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await conn.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await conn.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      });
    }
    conn.sendMessage(
      jid,
      {
        contacts: {
          displayName: `${list.length} Kontak`,
          contacts: list,
        },
        ...opts,
      },
      {
        quoted,
      }
    );
  };

  
  conn.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        const type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './src/tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
            res,
            filename,
            ...type,
            data,
            deleteFile() {
                return filename && fs.promises.unlink(filename)
            }
        }
    }

        
  conn.sendFile = async (
    jid,
    path,
    filename = "",
    caption = "",
    quoted,
    ptt = false,
    options = {}
  ) => {
    let type = await conn.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;
    if ((res && res.status !== 200) || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString()),
        };
      } catch (e) {
        if (e.json) throw e.json;
      }
    }
    let opt = {
      filename,
    };
    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;
    let mtype = "",
      mimetype = type.mime,
      convert;
    if (
      /webp/.test(type.mime) ||
      (/image/.test(type.mime) && options.asSticker)
    )
      mtype = "sticker";
    else if (
      /image/.test(type.mime) ||
      (/webp/.test(type.mime) && options.asImage)
    )
      mtype = "image";
    else if (/video/.test(type.mime)) mtype = "video";
    else if (/audio/.test(type.mime))
      (convert = await (ptt ? toPTT : toAudio)(file, type.ext)),
        (file = convert.data),
        (pathFile = convert.filename),
        (mtype = "audio"),
        (mimetype = "audio/ogg; codecs=opus");
    else mtype = "document";
    if (options.asDocument) mtype = "document";

    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;

    let message = {
      ...options,
      caption,
      ptt,
      [mtype]: {
        url: pathFile,
      },
      mimetype,
    };
    let m;
    try {
      m = await conn.sendMessage(jid, message, {
        ...opt,
        ...options,
      });
    } catch (e) {
      //console.error(e)
      m = null;
    } finally {
      if (!m)
        m = await conn.sendMessage(
          jid,
          {
            ...message,
            [mtype]: file,
          },
          {
            ...opt,
            ...options,
          }
        );
      file = null;
      return m;
    }
  };
  
  conn.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };
  
  conn.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;

    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    let trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
  
  
  conn.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
    let { ext, mime, data } = await conn.getFile(path);
    let media = {};
    let buffer;
    media.data = data;
    media.mimetype = mime;
    if (options && (options.packname || options.author)) {
      buffer = await writeExif(media, options);
    } else {
      buffer = /image/.test(mime)
        ? await imageToWebp(data)
        : /video/.test(mime)
        ? await videoToWebp(data)
        : "";
    }
    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await (await fetch(path)).buffer()
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }

    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };

  conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }

    await conn.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  
  conn.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    conn.sendMessage(
      jid,
      {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        ),
        ...options,
      },
      {
        quoted,
      }
    );
  
  return conn
}
WAConnection()
