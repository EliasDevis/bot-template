
import { SelectMenuInteraction } from "discord.js";
import { MyClient } from "types/MyClient";

export default async(client: MyClient, inter: SelectMenuInteraction) => 
    (await import(`../../menus/${inter.customId}`)).default(client, inter)
