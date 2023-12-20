import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'demote',
  async run({ conn, m, isAdmins, isBotAdmins, mess}) {
    if(!m.isGroup) return m.reply(mess.group)
    if(!isAdmins) return m.reply(mess.admin)
    if(!isBotAdmins) return m.reply(mess.botAdmin)
    let user = m.mentionedJid && m.mentionedJid[0]
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote') 
    m.reply(`Succes`)
  }
})
