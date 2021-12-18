
## О проекте ##
  Смысл проекта: **Нет**  
  Стиль написания кода: **Говнокод**  
  Версия node: **16.6+**  
  Версия discord.js: **13+**  
  Это шаблон дискорд бота написаного на **ts**, идея взята с **[template-bot от Maksim990](https://github.com/Maksim990/template-discord-bot/)**

## Преемущества ##
  + Обработчик текствых и слеш команд
  + Проверка на разрешения участника
  + Уже готовые команды `help`, `eval`, `server`, `bot`, `ping`
  + Обработчик нажатий кнопок и выбора в меню
  + Генератор сообщений информации, ошибки и успеха
  + Свой статус бота
  + Легкая регистрация своих команд

## Запуск ##
  1. Регистрируем бота на [discord developers](https://discord.com/developers/applications) 
  2. В файле `src/config.json` пишем:
  ```json
    "TOKEN": *токен бота*,
    "CLIENT_ID": *айди бота*,
    "GUILD_ID": *айди сервера для теста*,
    "ADMIN_ID": *айди создателя бота*,
    "PREFIX": *префикс команд*
  ```
  3. В консоли пишем `npm install` и `npm install -g typescript`
  4. Запуск бота `npm run build` и `npm run run`

## Создание команд ##
```js
import { CommandInteraction, GuildMember, Interaction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { info } from "../libs/embedBuilder";
import { Command } from "types/Command";
import { MyClient } from "types/MyClient";

export const cmd: Command = {
    data: new SlashCommandBuilder()
        .setDescription("Тест команда в ReadMe.md")
        .addStringOption(option =>
            option
                .setName("option")
                .setDescription("Тест текстовый аргумент")
                .setRequired(true)
        ),
    permission: "ADMINISTRATOR",
    run: (inter: CommandInteraction | Message, client: MyClient, { option }) => {
        inter.reply({
          embeds: [info(inter, `Тест команда была запущена с аргументом ${option})]`, "Тест")]
        })
    }
}
```

### Аргументы ###
| Переменная   | Описание                                     |
| ------------ | -------------------------------------------- |
| inter        | Сообщения или интеракция что вызвала команду |
| client       | Клиент бота                                  |
| { options }  | Полученые значения команд                    |

## Баги ##
Думаю что много, но особо не нашел

## TODO ##
[ ] Добавить функцию задержки команд