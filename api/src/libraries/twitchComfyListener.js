const ComfyJS = require('comfy.js');
const queries = require('../../db/queries');
const tmiTwitch = require('./twitchTmiListener');
const app = require('../app');

class TwitchComfyListener{
    client;
    constructor(){
        this.client = ComfyJS;
        this.query = new queries();
    }

    async Start(){
        await this.client.Init(process.env.CHANNEL_NAME, process.env.TWITCH_OAUTH);
    }

    async ChatHandler(user, message, flags, self, extra ) {
        if(self) return ;
        if(extra.messageType === "chat") {
            const userData = await this.query.createUser( user, extra );
            return userData;
        }
    }

    async RewardHandler( user, reward, cost, message, extra )
    {
        await this.query.createUser(user, extra);
        await this.query.createRewards(user, message, reward, extra);
    }

    async CommandsHandler( user, command, message, flags, extra )
    {
        const {countImage, countThreeD, countEmote} = (await this.query.getRewardsCount());
        const commands = [ 
            { 
                command: "botcommand", 
                flags: true, 
                response: () =>{
                    return '!countrewards, !UPData';
                }
            },
            { 
                command: 'countrewards', 
                flags: true,
                response: async () =>{
                    return `Image: ${await countImage()} | 3D model: ${await countThreeD()} | Emotes: ${await countEmote()}`;
                }
            },
            {
                command: 'updatedata',
                flags: true,
                response: () => {
                    return 'working';
                }
            }
        ];
        await commands.forEach(async ( item, index ) =>{
            const regex = new RegExp(item.command, 'g');
            if (command.match(regex) && item.flags) {
                this.client.Say(`[@BOT]: ${await item.response()}`);
            }
        });
    }
}
const twitchComfy = new TwitchComfyListener();
twitchComfy.Start();
module.exports = twitchComfy;
