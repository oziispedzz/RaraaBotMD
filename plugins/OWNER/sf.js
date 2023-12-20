import fs from "fs"
import { Plugins } from "../../lib/handler.js"

Plugins.create({
  name: 'sf',
  async run({ conn, m, text, isCreator, mess}) {
    if(!isCreator) return m.reply(mess.owner)
    if(!text) return m.reply(`Input File Name Plugins`)
    if(!m.quoted.text) return m.reply(`Reply code you want to add!`)
    let path = `./plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`Succes Add Command To ${path}`)
  }
})