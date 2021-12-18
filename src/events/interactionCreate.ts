
import { MyClient } from "types/MyClient";
import { Interaction } from "discord.js";
import { default as button} from "./interactions/button"
import { default as command} from "./interactions/command"
import { default as menu } from "./interactions/menu"

export default (client: MyClient, inter: Interaction) => {
    if (inter.isCommand()) command(client, inter)
    if (inter.isButton()) button(client, inter) 
    if (inter.isSelectMenu()) menu(client, inter)
}