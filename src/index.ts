
import { Intents } from "discord.js"
import { env } from "process"

import { TOKEN } from "./config.json"
import { MyClient } from "./types/MyClient"
import { default as cmdHand } from "./registers/commandsRegister"
import { default as evntHand } from "./registers/eventRegister"


const client = new MyClient({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
})

cmdHand(client)
evntHand(client)

client.login(env.TOKEN ?? TOKEN)