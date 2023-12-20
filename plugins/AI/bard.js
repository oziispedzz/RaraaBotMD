import '../../messages/Fauzidev.js'
import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'bard',
  async run({ conn, m, text }) {
    if(!text) return m.reply('Masukan Parameter Text')
    let url = await fetch(`https://api.betabotz.org/api/search/bard-ai?text=${text}&apikey=${apikey}`)
    let teks = await url.json()
    conn.sendMessage(m.chat, { text: teks.message }, { quoted: m })
  }
})