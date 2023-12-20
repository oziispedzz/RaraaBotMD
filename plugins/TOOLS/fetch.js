import fetch from 'node-fetch'
import { format } from 'util'
import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'fetch',
  async run({ m, text, conn, mess }) {
    if (!text) return m.reply('Masukkan url')
    m.reply(mess.wait)
    let { href: url, origin } = new URL(text)
    let res = await fetch(url, { headers: { 'referer': origin }})
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
	if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, ucapan, text, m, null, { fileName: ucapan, pageCount: fpagedoc, fileLength: fsizedoc, seconds: fsizedoc })
    let txt = await res.buffer()
    try {
		txt = format(JSON.parse(txt + ''))
	} catch (e) {
		txt = txt + ''
	} finally {
		m.reply(txt.slice(0, 65536) + '')
	}
  }
})

