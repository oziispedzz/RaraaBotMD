import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'anoboy-latest',
  async run({ m, conn, args }) {
    let page = args[0] || `1`
    let ress = await fetch(`https://weeb-scraper.onrender.com/api/anoboy?page=` + page)
    if (!ress) return m.reply('Error 404 Not Found')
    let res = await ress.json()
    let v = res.data
	let arr = []
	let tekss = res.data.map(v => { return `${v.title}\n${v.upload_time}\n${v.param}`}).filter(v => v).join('\n\n')
    await m.reply(tekss)
  }
})