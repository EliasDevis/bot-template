
import { CommandInteraction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { Command } from "types/Command";
import { MyClient } from "types/MyClient";
import { info } from "../libs/embedBuilder";

export let cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Команда помощи по командам"),

    run: (inter: CommandInteraction | Message, client: MyClient) => {
        const chapters = {
            info: "Информация",
            default: "Стандартные"
        }
        const embed = info(inter, "", "Список команд")

        for (const chapter in chapters) {
            let commands = ""

            client.commands.forEach(command => {
                if (command.chapter == chapter) commands += `\`${command.data.name}\` `
            })

            embed.addFields({
                name: chapters[chapter],
                value: commands,
                inline: true
            })
        }
        inter.reply({
            embeds: [embed]
        })



    }
}
