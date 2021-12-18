
import { CommandInteraction, GuildMember, Interaction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { success } from "../libs/embedBuilder";
import { Command } from "types/Command";
import { MyClient } from "types/MyClient";


export const cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Отправить сообщение с помощь бота, проверка работы аргументов команды")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("Сообщение которое надо отправить")
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName("member")
                .setDescription("Участник сервера")
        ),
    permission: "ADMINISTRATOR",
    run: (inter: CommandInteraction | Message, _client: MyClient, { message, member }) => {
        console.log(`Message: ${message}, MemberOption: ${member} MemberName: ${member?.user?.username}`)
        inter.reply({
            embeds: [success(inter, `**${inter.member.user.username}** хотел сказать **${message}** ${member ?? ""}`)]
        })
    }
}