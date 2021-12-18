
import { Collection, GuildMember, Message } from "discord.js";
import { MyClient } from "types/MyClient";
import { PREFIX } from "../config.json"
import * as perms from "../permissions.json"
import { info, error } from "../libs/console";
import { error as er } from "../libs/embedBuilder"


export default (client: MyClient, message: Message) => {

    if (!message.content.startsWith(PREFIX)) return

    const [commandName, ...args] = message.content.slice(1).split(" ")
    const params: {
        [key: string]: string | GuildMember
    } = {}

    let counter = 0;

    info(`Была вызвана команда: ${commandName}`)

    if (!client.commands.get(commandName)) return error(`Команда ${commandName} не найдена!`)

    let { run, permission, data: { options } } = client.commands.get(commandName)

    if (!message.member.permissions.has(permission)) return message.reply({
        embeds: [
            er(message,
                `Вы не имеете права: \`${perms[permission as string]}\` для использования команды \`${commandName}\``
            )]
    })

    const types = {
        6: [/<@!(\d{17,19})>/g, message.guild.members.cache, "участник"],
        7: [/<@#(\d{17,19})>/g, message.guild.channels.cache, "канал"],
        8: [/<@&(\d{17,19})>/g, message.guild.roles.cache, "роль"]
    }

    for (let { name, required, type } of options as unknown as {
        name: string,
        required: boolean,
        type: "SUB_COMMAND_GROUP" | "SUB_COMMAND" | "STRING" | "INTEGER" | "BOOLEAN" |
        "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE" | "NUMBER"
    }[]) {

        if (!args[counter] && required)
            return message.reply({ embeds: [er(message, `Вы не ввели параметр - \`${name}\`!`)] })

        if (!types[type]) {
            params[name] = args[counter]
            counter++
            continue
        }

        if (args[counter] !== undefined && !args[counter]?.match(types[type][0]))
            return message.reply({
                embeds: [er(message, `Параметр \`${args[counter]}\` не типа \`${types[type][2]}\`!`)]
            })

        if (args[counter]?.match(types[type][0])) 
            params[name] = (types[type][1] as Collection<string, GuildMember>)
                .get(args[counter].slice(3, -1))
    }

    run(message, client, params)
}

