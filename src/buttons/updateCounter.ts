
import { MyClient } from "types/MyClient";
import { ButtonInteraction } from "discord.js";

let counter = 1

export default (client: MyClient, inter: ButtonInteraction) => {

    inter.update({
        content: `Кнопка нажата - ${counter++} раз`
    })
}
    