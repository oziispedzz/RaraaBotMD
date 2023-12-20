import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'revoke',
  async run({ conn, m, isAdmins, isBotAdmins, mess}) {
    if(!m.isGroup) return m.reply(mess.group)
    if(!isAdmins) return m.reply(mess.admin)
    if(!isBotAdmins) return m.reply(mess.botAdmin)
    let res = await conn.groupRevokeInvite(m.chat)
    let gruf = m.chat
    conn.sendText(m.sender, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(gruf), m)
  }
})