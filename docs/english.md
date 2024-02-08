# TwitchToolsVX - New Implementations

- This project is a library/module that provides additional functionalities for interactions with the Twitch API, complementing the twitch-moderation-tools library and much more.

## Features

- `SetTitleLive(authTokenMain, channel, title, botChannel = false)`: Sets the title of a live broadcast.
- `SetTegLive(authTokenMain, channel, teg, botChannel = false)`: Sets the tag of a live broadcast.
- `GetTokenTwitchDevice(waitTimeInSeconds, scopes = [])`: Obtains an authentication token using Twitch's OAuth device flow.
- `RefreshToken(refreshToken, clientSecret)`: Refreshes an authentication token using a refresh token.
- `RemoveSpamCaules(channel, botModerator, message, tags)`: Removes messages containing spam stems.
- `BanSpamCaules(channel, botModerator, userBanned, message)`: Bans users who sent messages containing spam stems.
- `RemoveMessageSwearWord(channel, botModerator, tags, message)`: Removes messages containing words considered as swear words.
- `BanSwearWord(channel, botModerator, userBanned, message)`: Bans users who sent messages containing words considered as swear words.

## Important
- To use the functions SetTitleLive or SetTegLive, it is necessary to obtain the token from the specific channel you wish to modify. This is because Twitch separates functionalities between those that can be performed with a general token and those that require the channel-specific token. For example, if my bot is named StreamSquawk and I want to change the title or tag of the channel named jvzx_, I can only do so with the token from the jvzx_ channel, not with the token from StreamSquawk.

- If you want to obtain the CHANNEL token to use both functions, use the following scope:

```
scope=channel:manage:broadcast
```

- To illustrate, if I use both functions to try to change the title or tag of the live stream using the token from my bot StreamSquawk, the title or tag will be changed in the CHANNEL of my bot.


- These features are useful for moderating and managing live broadcasts on the Twitch platform. The TwitchToolsVX class provides a convenient interface to interact with the Twitch API and perform various moderation and content management operations.