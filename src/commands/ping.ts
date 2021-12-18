
import { CommandInteraction, Message, MessageActionRow, MessageButton, MessageSelectMenu } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { info } from "../libs/embedBuilder";
import { Command } from "types/Command";

export let cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Просто пинг-понг команда, проверка кнопок и меню"),

    run: (inter: CommandInteraction | Message) => {
        inter.reply({
            embeds: [info(inter, ":ping_pong:", "Понг!")],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("updateCounter")
                            .setLabel("Primary")
                            .setStyle("SUCCESS")
                    ),
                new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId("testMenu")
                            .setPlaceholder("Нечего не выбрано")
                            .addOptions([
                                {
                                    label: "Тест",
                                    description: "Описание 1",
                                    value: "first_option",
                                },
                                {
                                    label: "Тест 2",
                                    description: "Описание 2",
                                    value: "second_option",
                                },
                            ])
                    )]
        })
    }
}
