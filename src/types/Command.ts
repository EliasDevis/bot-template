
import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, PermissionResolvable } from "discord.js"
import { MyClient } from "./MyClient"


export type Command = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    run: (
        inter: CommandInteraction | Message,
        client: MyClient,
        params: { [key: string]: any }
    ) => void,
    chapter?: string, 
    cooldwon?: number,
    permission?: PermissionResolvable,
    slash?: boolean
}