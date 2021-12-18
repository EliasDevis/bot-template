
import { MyClient } from "types/MyClient";
import { SelectMenuInteraction } from "discord.js";


export default (_client: MyClient, inter: SelectMenuInteraction) => {
    if (inter.values[0] == "first_option") inter.reply("Тест сообщение!")
    if (inter.values[0] == "second_option") inter.reply("Тест сообщение 2!")
}
    