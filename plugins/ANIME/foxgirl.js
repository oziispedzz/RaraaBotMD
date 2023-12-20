import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'foxgirl',
  async run({ m, conn, text }) {
    let res = await fetch('https://nekos.life/api/v2/img/fox_girl')
    if (!res.json) throw await res.text()
    let json = await res.json()
    let url = json.url
    if (!json.url) return m.reply(`Error, Mungkin Api Mati`)
    await conn.sendMessage(m.chat, { image: { url: url }}, { quoted: m })
  }
})

