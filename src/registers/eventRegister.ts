
import { readdirSync } from "fs"
import { Client } from "discord.js"
import { info, success } from "../libs/console"


export default (client: Client) => {
    readdirSync("./src/events/", {withFileTypes: true}).forEach(f => {
        if (f.isDirectory()) return
        
        const event = (...args) => require(`../events/${f.name.slice(0, -3)}`).default(client, ...args)

        info(`Загружено событие - ${f.name.slice(0, -3)}`)
        require(`../events/${f.name.slice(0, -3)}`).once
            ? client.once(f.name.slice(0, -3), event)
            : client.on(f.name.slice(0, -3), event)
    }) 
    success(`Загружено ${readdirSync("./src/events/").length} событий!`)
}
