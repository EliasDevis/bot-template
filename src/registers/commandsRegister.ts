
import { readdirSync } from "fs"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { TOKEN, CLIENT_ID, GUILD_ID } from "../config.json"
import { success } from "../libs/console"
import { MyClient } from "../types/MyClient"
import { Command } from "types/Command"

export default (client: MyClient) => {
    let commands = [];

    readdirSync("./src/commands/", { withFileTypes: true })
        .forEach(file => {

            if (file.isDirectory())
                readdirSync(`./src/commands/${file.name}`)
                    .forEach(file2 => {
                        const command: Command =
                            require(`../commands/${file.name}/${file2.slice(0, -3)}`).cmd

                        command.data.setName(file2.slice(0, -3))
                        command.chapter = file.name
                        client.commands.set(file2.slice(0, -3), command)
                        if (command.slash === false) return;

                        commands.push(command)
                    })
            else {
                const command = require(`../commands/${file.name.slice(0, -3)}`).cmd

                command.data.setName(file.name.slice(0, -3))
                command.chapter = "default"
                client.commands.set(file.name.slice(0, -3), command)

                commands.push(command)
            }
        })

    commands = commands.map(command => command.data)

    const rest = new REST({ version: "9" }).setToken(TOKEN);
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => success("Команды зарегестрированы!"))
        .catch(console.error);
}