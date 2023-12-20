
/* 

 - BASE ORI FAUZIDEV
 - ORI SCRIPT BY FAUZIDEV

*/

import "./Fauzidev.js"
import {getRandom, TelegraPh} from '../lib/simple.js'
import { dtb } from '../database/index.js'
import fs from "fs"

export async function register(m,makeid,isCmd,isCreator){
const user = global.db.data.users[m.sender]
const limitCount = isCreator ? "Unlimited" : dtb.config.limitCount.free
const chat = global.db.data.chats[m.chat] 
const prefix = '.'

if(isCmd || isCreator){
if (user) {
if (!('name' in user)) user.name = m.pushname
if (!('id' in user)) user.id = m.senderNumber
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.level)) user.level = 1
if (!isNumber(user.hit)) user.hit = 1
if (!isNumber(user.balance)) user.balance = 1000
if (!isNumber(user.limit)) user.limit = limitCount
if (!isNumber(user.afk)) user.afk = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.lastclaim)) user.lastclaim = 0
if (!('registered' in user)) user.registered = false
if (!user.premium) user.premiumTime = 0

if (!user.registered) {
if (!('name' in user)) user.name = this.getName(m.sender)
if (!('serial' in user)) user.serial = makeid(10).toUpperCase()
if (!isNumber(user.ayam)) user.ayam = 1
if (!isNumber(user.kelinci)) user.kelinci = 1
if (!isNumber(user.kambing)) user.kambing = 1
if (!isNumber(user.sapi)) user.sapi = 1
if (!isNumber(user.hp)) user.hp = 100
if (!isNumber(user.age)) user.age = -1
if (!isNumber(user.dm)) user.dm = 0
if (!isNumber(user.iron)) user.iron = 2
if (!isNumber(user.gold)) user.gold = 1
if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
if (!isNumber(user.sword)) user.sword = 0
if (!isNumber(user.sworddurability)) user.sworddurability = 0
if (!isNumber(user.premiumDate)) user.premiumDate = -1
if (!isNumber(user.regTime)) user.regTime = -1
if (!isNumber(user.lasthunt)) user.lasthunt = 0
if (!isNumber(user.tiketcoin)) user.tiketcoin = 1
}



} else {
global.db.data.users[m.sender] = {
name: m.pushname,
id: m.senderNumber,
date: calender,
exp: 100,
level: 1,
hit: 0,
balance: 1000,
limit: limitCount,
glimit: 30,
serial: makeid(4).toUpperCase(),
lastclaim: 0,
lastswordclaim: 0,
sword: 0,
sworddurability: 0,
lasthunt: 0,
afk: -1,
autolevelup: true
}



}
}// akhir if(iscmd)


  

} //akhir fungsi register