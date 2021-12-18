
import { CommandInteraction, Message, MessageActionRow, MessageButton } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { info } from "../../libs/embedBuilder";
import { MyClient } from "types/MyClient";
import { Command } from "types/Command";

export let cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Просмотреть информацию о боте"),

    run: (inter: CommandInteraction | Message, client: MyClient) => {

        inter.reply({
            embeds: [
                info(inter, "", "Информация о боте")
                    .addField("Пинг:", `${client.ws.ping} мс`, true)
                    .addField("Количество серверов:", `${client.guilds.cache.size}`, true)
                    .addField("Запущен:", `<t:${~~(Date.now() / 1000 - client.uptime)}>`, true)
                    .addField("Время создания:", `<t:${~~(client.user.createdAt.getTime() / 1000)}>`, true)
            ],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Страница бота")
                            .setStyle("LINK")
                            .setURL("http://github.com")
                    )
            ]
        })
    }
}
