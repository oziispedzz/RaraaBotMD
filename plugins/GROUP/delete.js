import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'delete',
  async run({ conn, m, mess, isAdmins, isBotAdmins}) {
    if(!m.isGroup) return m.reply(mess.group)
    if(!isAdmins) return m.reply(mess.admin)
    if(!isBotAdmins) return m.reply(mess.botAdmin)
    let key = {}
    try {
      key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
	  key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
	  key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
   	  key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant 
    } catch (e) {
      m.reply(mess.error.lv)
    }
    conn.sendMessage(m.chat, { delete: key })
  }
})
