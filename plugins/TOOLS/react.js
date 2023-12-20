import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'react',
  async run({ conn, m, text }) {
    if (!m.quoted) return m.reply('Reply Chat!')
	if (text.length > 2) return m.reply('Only For 1 Emoji!')
	if (!text) return m.reply(`Usage Example :\n.react 🗿`)
    conn.relayMessage(m.chat, { reactionMessage: {
    key: {
    id: m.quoted.id,
    remoteJid: m.chat,
    fromMe: true
    },
    text: `${text}`}}, { messageId: m.id })
  }
})