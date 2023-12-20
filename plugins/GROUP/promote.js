import { Plugins } from '../../lib/handler.js'
import { areJidsSameUser } from '@whiskeysockets/baileys'

Plugins.create({
  name: 'promote',
  async run({ conn, m, isAdmins, isBotAdmins, participants, mess}) {
    if(!m.isGroup) return m.reply(mess.group)
    if(!isAdmins) return m.reply(mess.admin)
    if(!isBotAdmins) return m.reply(mess.botAdmin)
    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let promoteUser = []
    for (let user of users)
    if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
    const res = await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
    await delay(1 * 1000)
    }
    m.reply(`Succes`)
  }
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))