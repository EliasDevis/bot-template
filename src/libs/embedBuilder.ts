
import { ColorResolvable, Interaction, Message, MessageEmbed } from "discord.js"

function embed(inter: Message | Interaction, text: string, color: ColorResolvable, title: string, icon?: string) {
    return new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(`${icon ? `${icon} |` : ""} ${text}`)
        .setAuthor(inter.member.user.username, 
            `https://cdn.discordapp.com/avatars/${inter.member.user.id}/${inter.member.user.avatar}.jpeg` )
        .setTimestamp()
}

export const error = (inter: Message | Interaction, text: string) =>
    embed(inter, text, "RED", "Ошибка!",  ":no_entry:")

export const success = (inter: Message | Interaction, text: string) =>
    embed(inter, text, "GREEN", "Успех!", ":white_check_mark:")

export const info = (inter: Message | Interaction, text: string, title: string) => 
    embed(inter, text, "BLUE", title)
