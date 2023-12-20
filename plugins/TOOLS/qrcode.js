import { Plugins } from '../../lib/handler.js'
import { toDataURL } from 'qrcode'

Plugins.create({
  name: 'qrcode',
  async run({ conn, m, text }) {
    if(!text) return m.reply('Masukan Parameter Text')
    conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '', m)
  }
})