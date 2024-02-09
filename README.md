# TwitchToolsVX - New Implementations

This project is a library/module that provides additional functionalities for interacting with the Twitch API, complementing the Vitor-VX/Twitch-Tools library and much more.

## Functionalities

### `SetTitleLive(authTokenMain, channel, title, botChannel = false)`
Sets the title of a live stream.

**Usage Example:**
```javascript
SetTitleLive('authToken', 'channelName', 'New Live Title');
```

### `SetTegLive(authTokenMain, channel, teg, botChannel = false)`
Sets the tag of a live stream.

**Usage Example:**
```javascript
SetTegLive('authToken', 'channelName', 'new-tag');
```

### `GetTokenTwitchDevice(waitTimeInSeconds, scopes = [])`
Obtains an authentication token using the Twitch device OAuth flow.

**Usage Example:**
```javascript
GetTokenTwitchDevice(30, ['channel:manage:broadcast']);
```

### `RefreshToken(refreshToken, clientSecret)`
Refreshes an authentication token using a refresh token.

**Usage Example:**
```javascript
RefreshToken('refreshToken', 'clientSecret');
```

### Additional Functionalities
In addition to the functionalities mentioned above, this library also includes custom features that I developed myself and that can be useful, such as:

- `RemoveSpamCaules(channel, botModerator, message, tags)`: Removes messages containing spam keywords.
- `BanSpamCaules(channel, botModerator, userBanned, message)`: Bans users who sent messages containing spam keywords.
- `RemoveMessageSwearWord(channel, botModerator, tags, message)`: Removes messages containing swear words.
- `BanSwearWord(channel, botModerator, userBanned, message)`: Bans users who sent messages containing swear words.

These additional functionalities were developed by myself using custom libraries like npm i swearguard-vx, which checks for swear words in strings, and are "not part of" the standard Twitch functionalities.

These functionalities are useful for moderating and managing live streams on the Twitch platform. The TwitchToolsVX class provides a convenient interface for interacting with the Twitch API and performing various moderation and content management operations.

## Installation
To install the library, you can use npm. Run the following command:

```bash
npm i twitch-tools-vx
```

## Important

To use the SetTitleLive or SetTegLive functions, you need to obtain the token of the channel you want to modify. This is because Twitch separates functionalities between those that a token can perform and those that can only be performed with the token of the specific channel. For example, if my bot is called StreamSquawk and I want to change the title or tag of the channel called jvzx_, I can only do that with the token of the jvzx_ channel, not with the token of StreamSquawk.

If you want to obtain the CHANNEL token to use both functions, use the following scope:

```
scope=channel:manage:broadcast
```

For example, if I use both functions to try to change the title or tag of the live stream using the token of my bot StreamSquawk, the title or tag will be changed in the CHANNEL of my bot.

## Observação - PT-BR

A documentação completa em português-br está disponível na pasta docs/ptbr.
