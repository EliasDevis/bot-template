
import { Client, ClientOptions, Collection } from "discord.js";
import { Command } from "./Command";

export class MyClient extends Client {

    private _commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        super(options);
        this._commands = new Collection();
    }

    set commands(commands: Collection<string, Command>) {
        this._commands = commands
    }

    get commands() {
        return this._commands
    }

}