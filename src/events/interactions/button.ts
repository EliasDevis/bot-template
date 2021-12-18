
import { MyClient } from "types/MyClient";
import { ButtonInteraction } from "discord.js";

export default async (client: MyClient, inter: ButtonInteraction) => 
    (await import(`../../buttons/${inter.customId}`)).default(client, inter)
