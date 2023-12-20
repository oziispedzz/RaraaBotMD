import { Plugins } from '../../lib/handler.js'

Plugins.create({
  name: 'tagall',
  async run({ conn, m, text, q, dtb, isAdmins, isBotAdmins, participants, mess}) {
    if(!m.isGroup) return m.reply(mess.group)
    if(!isAdmins) return m.reply(mess.admin)
    if(!isBotAdmins) return m.reply(mess.botAdmin)
    let tekss = `─• *Mention All* •─\n\n• *Message : ${q ? q : "empty"}*\n\n`;
    for (let mem of participants) {
    tekss += `@${mem.id.split("@")[0]}\n`;
    }
    tekss += `\n*${dtb.config.botName}*`;
    conn.sendMessage(m.chat, { text: tekss, mentions: participants.map((a) => a.id), }, { quoted: m });
  }
})