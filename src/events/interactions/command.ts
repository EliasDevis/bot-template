
import { MyClient } from "types/MyClient";
import { CommandInteraction } from "discord.js";
import { error } from "../../libs/embedBuilder";
import * as perms from "../../permissions.json"
import { info } from "../../libs/console";

export default (client: MyClient, inter: CommandInteraction) => {
    const params: { [key: string]: any } = {}

    inter.options.data.forEach(option => {
        params[option.name] = option.value
        if (option.type == "USER") params[option.name] = option.member
        if (option.type == "ROLE") params[option.name] = option.role
        if (option.type == "CHANNEL") params[option.name] = option.channel
    })

    const { run, permission } = client.commands.get(inter.commandName)

    if (!inter.memberPermissions.has(permission)) return inter.reply({
        embeds: [
            error(inter,
                `Вы не имеете права: \`${perms[permission as string]}\` для использования команды \`${inter.commandName}\``
            )]
    })

    info(`Была вызвана слеш команда: ${inter.commandName}`)
    run(inter, client, params)
}