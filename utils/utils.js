const axios = require("axios");

const SpamCaule = (message) => {
    const FiltreSpam = ['⣿', '⡟', '⠁', '⠰', '⢻', '⠿', '⠟', '⠛', '⠉', '⠈', '⠈', '⠄'];
    return FiltreSpam.some(spam => message.includes(spam));
}

const GetDeviceResponse = async (clientId, scopes = []) => {
    try {
        const responseDevice = await axios.post('https://id.twitch.tv/oauth2/device', null, {
            params: {
                client_id: clientId,
                scopes: scopes.join(' ')
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return responseDevice ? responseDevice.data : false;
    } catch (error) {
        return {
            success: false,
            error: error ? error.response.data : false
        }
    }
}

const GetTokenWithDeviceCode = async (device, clientId) => {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                device_code: device.device_code,
                grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return { success: true, data: response ? response.data : false };
    } catch (error) {
        return {
            success: false,
            error: error ? error.response.data : false,
            message: `Device not allowed, please access the link: ${device.verification_uri}`
        }
    }
}

const HandleError = (error, msg = "") => {

    if (msg === null || msg === undefined || msg === "") {
        msg = "";
    }

    if (error === null) {
        return msg;
    }

    if (/400/.test(error) || error.response.data.status === 400) {
        return {
            typeError: "Bad Request",
            details: [
                "The broadcaster_id query parameter is required.",
                "The length query parameter is required.",
                "The ID in broadcaster_id is not valid.",
                "To start a commercial, the broadcaster must be streaming live.",
                "The broadcaster may not run another commercial until the cooldown period expires. The retry_after field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials.",
            ],
            message: msg
        };
    } else if (/401/.test(error) || error.response.data.status === 401) {
        return {
            typeError: "Unauthorized",
            details: [
                "The ID in broadcaster_id must match the user ID found in the request’s OAuth token.",
                "The Authorization header is required and must contain a user access token.",
                "The user access token must include the channel:edit:commercial scope.",
                "The OAuth token is not valid.",
                "The client ID specified in the Client-Id header does not match the client ID specified in the OAuth token."
            ],
            message: msg
        };
    } else if (/404/.test(error) || error.response.data.status === 404) {
        return {
            typeError: "Not Found",
            details: [
                "The ID in broadcaster_id was not found."
            ],
            message: msg
        };
    } else if (/429/.test(error) || error.response.data.status === 429) {
        return {
            typeError: "Too Many Requests",
            details: [
                "The broadcaster may not run another commercial until the cooldown period expires. The retry_after field in the previous start commercial response specifies the amount of time the broadcaster must wait between running commercials."
            ],
            message: msg
        };
    } else if (/500/.test(error) || error.response.data.status === 500) {
        return {
            typeError: "Internal Server Error",
            details: [
                "An internal server error occurred at Twitch's server."
            ]
        };
    } else {
        return {
            typeError: "Unknown Error",
            details: [
                "An unknown error occurred."
            ],
            message: msg
        };
    }
};

module.exports = {
    GetDeviceResponse,
    GetTokenWithDeviceCode,
    HandleError,
    SpamCaule
};