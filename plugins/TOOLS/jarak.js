import axios from 'axios'
import cheerio from 'cheerio'
import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'jarak',
  async run({ conn, text, m, prefix, mess }) {
    var [from, to] = text.split`|`
    if (!(from && to)) return m.reply(`*Example:* ${prefix + 'jarak'} Sukabumi|bandung`)
    var data = await jarak(from, to)
    m.reply(mess.wait)
    if (data.img) return conn.sendMessage(m.chat, { image: data.img, caption: data.desc }, { quoted: m })
	else m.reply(data.desc)
  }
})

async function jarak(dari, ke) {
	var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
	var $ = cheerio.load(html), obj = {}
	var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
	obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
	obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
	return obj
}