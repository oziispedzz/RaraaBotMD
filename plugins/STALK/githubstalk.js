import { Plugins } from '../../lib/handler.js'
import fetch from 'node-fetch'

Plugins.create({
  name: 'githubstalk',
  async run({ conn, m, text, apiFauzi, mess}) {
    if(!text) return m.reply('Masukan Username Github')
    m.reply(mess.wait)
    let url = await fetch(apiFauzi + `/stalk/ghstalk?username=${text}`)
    let json = await url.json()
    let teks = `• Username : ${json.result.username}\n`
    teks += `• Nickname : ${json.result.nickname}\n`
    teks += `• Followers : ${json.result.followers}\n`
    teks += `• Following : ${json.result.following}\n`
    teks += `• Repository : ${json.result.repository}\n`
    teks += `• Twitter : ${json.result.twitter}\n`
    teks += `• Email : ${json.result.email}\n`
    teks += `• Location : ${json.result.location}\n`
    teks += `• Blog : ${json.result.blog}\n`
    teks += `• Link : ${json.result.link}`
    m.reply(teks)
  }
})