import { Plugins } from "../../lib/handler.js"
import { exec } from "child_process"

Plugins.create({
  name: 'dlp',
  async run({ totalPlugin, conn, isCreator, m, args }) {
  if(!isCreator) return 
  if(!args[0]) return m.reply("Example: .dlp main/sc")
  let file = `./plugins/${args[0]}.js`
  return exec(`rm ${file}`,  () => {
  void m.reply(`Succesfully deleted ${file}`)
  })
  }
})