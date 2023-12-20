import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'anoboy-dl',
  async run({ m, conn, text }) {
    if (!text) return m.reply(`Id?`)
    let ress = await fetch(`http://weeb-scraper.onrender.com/api/anoboy/` + text)
    if (!ress) return m.reply('Error 404 Not Found')
    let res = await ress.json()
    let v = res.data
    let linkvi = res.data.video_embed_links
    let miror = res.data.video_mirrors
    let cap = `*Title :* ${res.data.name || res.data.episode_navigation.nav_name}\n*Synopsis :* ${res.data.synopsis || '-'}\n\n*Link untuk mendownload atau menonton videonya*\n`
    for (let x of linkvi) {
    for (let z of miror) {
    cap += `*Download 1 :*\n${x.resolution || '-'} : ${x.link || '-'}\n*Download 2 :*\n${z.resolution || '-'} : ${z.link || '-'}`
    cap += '' + '\n'
  	} }
    await conn.sendText(m.chat, cap, m)
  }
})

