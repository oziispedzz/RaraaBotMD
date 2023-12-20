
/* 

 - BASE ORI FAUZIDEV
 - ORI SCRIPT BY FAUZIDEV

*/

import { readFileSync, accessSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dirr = join(dirname(fileURLToPath(import.meta.url)), "settings");
const dbName = "json";
const file = {
  config: join(dirr, "config." + dbName),
};

accessSync(file.config);

export let dtb = {
  config: JSON.parse(readFileSync(file.config)),
};

setInterval(async() => {
  writeFileSync(file.config, JSON.stringify(dtb.config, null, 2));
}, 990);