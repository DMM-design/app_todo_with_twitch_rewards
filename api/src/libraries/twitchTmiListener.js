const fetch = require('node-fetch');

class twitchTmiListener {
    constructor() {
        this.URIToken = ( client_id, client_server ) => `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_server}&grant_type=client_credentials&scope=user:read:email`;
    }

    async GetToken()
    {
        const urlToken = this.URIToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
        const token = await fetch(urlToken, {
            method: 'POST'
        });
        const tokenJSON =  await token.json();
        return tokenJSON.access_token;
    }

    async helix( url )
    {
        const token = await this.GetToken();
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': `Bearer ${token}`
            }
        });
        return await data.json();
    }

    async setUserFollow( extra ){
        const roomId = extra.channelId || extra.roomId;
        const data = await this.helix(`https://api.twitch.tv/helix/users/follows?from_id=${extra.userId}&to_id=${roomId}`);
        return data;
    };

    async getUserAvatar( extra ){
        const data = await this.helix(`https://api.twitch.tv/helix/users?id=${extra.userId}`);
        return data.data[0].profile_image_url;
    };

}

const twitchTmi =  new twitchTmiListener();
module.exports = twitchTmi;