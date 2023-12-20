import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'igstalk',
  async run({ conn, m, text, apiFauzi, mess}) {
    if(!text) return m.reply('Masukan Username Instagram\nNote: Jangan Menggunakan @')
    m.reply(mess.wait)
    let url = await fetch(apiFauzi + `/stalk/igStalk?username=${text}`)
    let json = await url.json()
    let teks = `• Username : ${json.result.username}\n`
    teks += `• Nickname : ${json.result.name}\n`
    teks += `• Followers : ${json.result.followers}\n`
    teks += `• Following : ${json.result.following}\n`
    teks += `• Post : ${json.result.post}\n`
    teks += `• Bio : ${json.result.description}\n`
    teks += `• Link : ${json.result.profilePic}`
    conn.sendMessage(m.chat, { image: { url: json.result.profilePic },  caption: teks}, { quoted: m })
  }
})