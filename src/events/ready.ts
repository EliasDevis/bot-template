
import { MyClient } from "types/MyClient";
import { success } from "../libs/console";

export const once = true
export default (client: MyClient) => {
    setInterval(() => {
        const statuses = [
            `Смотрю за ${client.guilds.cache.size} серверами!`,
            "Команда помощи - /help!",
            `Знаю ${client.commands.size} команд!`
        ]
        client.user.setActivity({
            name: statuses[Math.floor(Math.random() * statuses.length)]
        })
    }, 10000)

    success("Бот запущен!")
}