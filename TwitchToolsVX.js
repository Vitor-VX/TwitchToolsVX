const {
    GetDeviceResponse,
    GetTokenWithDeviceCode,
    HandleError,
    SpamCaule
} = require("./utils/utils");

const TwitchModerationAPI = require("twitch-moderation-tools");
const axios = require("axios");
const { checkWordIlicita } = require("swearguard-vx");

class TwtchToolsVX {
    constructor(authTokenBot, clientId) {
        this.clientId = clientId;
        this.authTokenBot = authTokenBot;

        this.headers = {
            'Authorization': `Bearer ${authTokenBot}`,
            'Client-Id': clientId,
            'Content-Type': 'application/json'
        };

        this.TwitchModeration = new TwitchModerationAPI(authTokenBot, clientId);
    }

    async SetTitleLive(authTokenMain, channel, title, botChannel = false) {
        try {
            const idChannel = await this.TwitchModeration.GetInfoUser(channel);

            const updateLiveStreamTitle = async (authToken) => {
                try {
                    const response = await axios.patch(`https://api.twitch.tv/helix/channels?broadcaster_id=${idChannel[0].user_id}`, {
                        title: title
                    }, {
                        headers: {
                            'Client-ID': this.clientId,
                            'Authorization': `Bearer ${authToken}`
                        }
                    });

                    return response ? `Changed live stream title for ${channel}` : false;
                } catch (error) {
                    return HandleError(error, error.response?.data?.message);
                }
            };

            return botChannel ? updateLiveStreamTitle(this.authTokenBot) : updateLiveStreamTitle(authTokenMain);
        } catch (error) {
            return HandleError(error, error.response?.data?.message);
        }
    }

    async SetTegLive(authTokenMain, channel, teg, botChannel = false) {
        try {
            const idChannel = await this.TwitchModeration.GetInfoUser(channel);
            const gameId = await this.TwitchModeration.GetGameId(teg);

            const updateLiveStreamTeg = async (authToken) => {
                try {
                    const response = await axios.patch(`https://api.twitch.tv/helix/channels?broadcaster_id=${idChannel[0].user_id}`, {
                        game_id: gameId.id
                    }, {
                        headers: {
                            'Client-ID': this.clientId,
                            'Authorization': `Bearer ${authToken}`
                        }
                    });

                    return response ? `Changed live stream tag for ${channel}` : false;
                } catch (error) {
                    return HandleError(error, error.response.data.message);
                }
            }

            return botChannel ? updateLiveStreamTeg(this.authTokenBot) : updateLiveStreamTeg(authTokenMain);
        } catch (error) {
            return HandleError(error, error.response?.data?.message);
        }
    }

    async GetTokenTwitchDevice(waitTimeInSeconds, scopes = []) {
        if (scopes.length > 0) {

            const device = await GetDeviceResponse(this.clientId, scopes);

            if (device) {
                console.log(device);

                await new Promise(resolve => setTimeout(resolve, waitTimeInSeconds));

                const tokenDevice = await GetTokenWithDeviceCode(device, this.clientId);

                return tokenDevice
            }
        }

        return `Not found scopes`;
    }

    async RefreshToken(refreshToken, clientSecret) {
        try {
            const response = await axios.post('https://id.twitch.tv/oauth2/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                client_id: this.clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            });

            return response ? response.data : HandleError(null, "Erro in refresh token");
        } catch (error) {
            return HandleError(error, error.response.data.message);
        }
    }

    async RemoveSpamCaules(channel, botModerator, message, tags) {
        try {
            return SpamCaule(message) ? this.TwitchModeration.RemoveMessageChat(channel, botModerator, tags.id) : HandleError(null, "Erro ao remover a mensagem");
        } catch (error) {
            HandleError(error, null);
        }
    }

    async BanSpamCaules(channel, botModerator, userBanned, message) {
        try {
            return SpamCaule(message) ? this.TwitchModeration.BanUser(channel, botModerator, userBanned, "Spam caule.") : HandleError(null, "Erro ao remover a mensagem");
        } catch (error) {
            HandleError(error, null);
        }
    }

    async RemoveMessageSwearWord(channel, botModerator, tags, message) {
        try {
            return checkWordIlicita(message) ? this.TwitchModeration.RemoveMessageChat(channel, botModerator, tags.id) : HandleError(null, "Erro ao remover a mensagem");
        } catch (error) {
            return HandleError(error, null);
        }
    }

    async BanSwearWord(channel, botModerator, userBanned, message) {
        try {
            return checkWordIlicita(message) ? this.TwitchModeration.BanUser(channel, botModerator, userBanned, "SwearWord") : HandleError(null, "Erro ao remover a mensagem");
        } catch (error) {
            return HandleError(error, null);
        }
    }
}

module.exports = TwtchToolsVX;