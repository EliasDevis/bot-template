
import { CommandInteraction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { info } from "../../libs/embedBuilder";
import { Command } from "types/Command";

export let cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Просмотреть информацию о сервере"),

    run: async (inter: CommandInteraction | Message) => {
        const { guild, guildId } = inter
        const guildMembers = await guild.members.fetch({ withPresences: true })
        const guildChannels = guild.channels.cache

        inter.reply({
            embeds: [
                info(inter, "", `**${guild.name}**`)
                    .addField("Владелец", `<@${guild.ownerId}>`, true)
                    .addField("Айди", `*${guildId}*`, true)
                    .addField("Дата создания", `<t:${~~(guild.createdTimestamp / 1000)}>`, true)
                    .addField(
                        "Статусы",
                        `В сети: ${guildMembers.filter(member => member.presence?.status == "online").size}
                        Не в сети: ${guildMembers.filter(member => member.presence?.status == "offline").size}
                        Не беспокоить: ${guildMembers.filter(member => member.presence?.status == "dnd").size}`, true)
                    .addField(
                        "Каналов",
                        `Голосовых: ${guildChannels.filter(channel => channel.isVoice()).size}
                        Текстовых: ${guildChannels.filter(channel => channel.isText()).size}
                        Всего: ${guildChannels.size}`, true)
                    .addField(
                        "Участников",
                        `Людей: ${guildMembers.filter(member => !member.user.bot).size}
                        Ботов: ${guildMembers.filter(member => member.user.bot).size}
                        Всего: ${guildMembers.size}`, true)

                    .setThumbnail(guild.iconURL())
            ]
        })
    }
}
