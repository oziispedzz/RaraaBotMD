import fs from 'fs/promises';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from "url"
import path from 'path';
import fss from 'fs'

const { readdirSync } = fss;

class Pluginss {
  commands = new Map()
  create ({ name, run }) {
    this.commands.set(name, { name, run })
  }
  run (name, options) {
    const command = this.commands.get(name)
    if (command) {
      command.run(options)
      return true 
    } else {
      return false
    }
  }
  commandPath (commandsPath) {
    const path = commandsPath
    const commandsFolder = readdirSync(path)
    commandsFolder.forEach(file => {
      const filePath = join(path, file)
        const isDirectory = !file.includes('.')
        if (isDirectory) {
        const subcommandsFolder = readdirSync(filePath)
        subcommandsFolder.forEach(filee => {
          if (filee.endsWith('.js')) {
            const subcommandPath = join(filePath, filee)
            import(subcommandPath)
          }
        })
      } else if (file.endsWith('.js')) {
        import(filePath)
      }
    })
  }
  async indexMenu (text, prefix) {
    const path = `./plugins/`;
    const Cmdlist = [];
    const files = await fs.readdir(path);
    const groups = {};
    for (const file of files) {
      const nestedFile = await fs.readdir(path + file);
      nestedFile.forEach((name) => {
        if(!name.endsWith('.js')) return;
        const names = name.replace(/\.js/g, '');
        Cmdlist.push({
          name: names,
          group: file,
          path: `plugins/${file}/${name}`,
        });
      });
    };
    Cmdlist.forEach((item) => {
      if(!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item.name);
    });
    for (const group in groups) {
      const member = groups[group].join(`\n• `+ `${prefix}`);
      text += `*${group.toUpperCase()}*\n`
      text += `• ${prefix + member}\n\n`
    };
    return text
  }; 
}
export const Plugins = new Pluginss();