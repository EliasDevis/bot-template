
import { CommandInteraction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { error, info, success } from "../../libs/embedBuilder";
import { Command } from "types/Command";
import { MyClient } from "types/MyClient";
import { ADMIN_ID } from "../../config.json"


export let cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Выполнить код")
        .addStringOption(
            option => option
                .setName("code")
                .setRequired(true)
                .setDescription("Сам код :)")),
    slash: false,
    run: async (inter: CommandInteraction | Message, _client: MyClient, { code }: { code?: string }) => {
        if (inter.member.user.id != ADMIN_ID)
            return inter.reply({ embeds: [error(inter, "Вы не можете использовать данную команду!")] })

        if (!(code.startsWith("```js") && code.endsWith("```")))
            return inter.reply({
                embeds: [error(inter,
                    "Добавьте подсветку синтаксиса для кода! Например: ```js\nconsole.log(\"Hello\")```"
                )]
            })
        code = code
            .replaceAll("```js", "")
            .replaceAll("```", "")
        
        try {
            const evaled = await eval(code)

            inter.reply({
                embeds: [info(inter, `\`\`\`js\n${evaled}\`\`\``, "Результат:")]
            })
        } catch (e) {
            inter.reply({
                embeds: [error(inter, `\`\`\`js\n${e}\`\`\``)]
            })
        }
    }
}
