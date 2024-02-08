# TwitchToolsVX - Novas Implementações

- Este projeto é uma biblioteca/módulo que proporciona funcionalidades adicionais para interações com a API da Twitch, complementando a biblioteca twitch-moderation-tools e muito mais.

## Funcionalidades

- `SetTitleLive(authTokenMain, channel, title, botChannel = false)`: Define o título de uma transmissão ao vivo.
- `SetTegLive(authTokenMain, channel, teg, botChannel = false)`: Define a tag de uma transmissão ao vivo.
- `GetTokenTwitchDevice(waitTimeInSeconds, scopes = [])`: Obtém um token de autenticação usando o fluxo de dispositivo OAuth da Twitch.
- `RefreshToken(refreshToken, clientSecret)`: Atualiza um token de autenticação usando um token de atualização.
- `RemoveSpamCaules(channel, botModerator, message, tags)`: Remove mensagens que contenham caules de spam.
- `BanSpamCaules(channel, botModerator, userBanned, message)`: Bane usuários que enviaram mensagens contendo caules de spam.
- `RemoveMessageSwearWord(channel, botModerator, tags, message)`: Remove mensagens que contenham palavras consideradas palavrões.
- `BanSwearWord(channel, botModerator, userBanned, message)`: Bane usuários que enviaram mensagens contendo palavras consideradas palavrões.

Essas funcionalidades são úteis para moderar e gerenciar transmissões ao vivo na plataforma Twitch. A classe TwitchToolsVX fornece uma interface conveniente para interagir com a API da Twitch e realizar várias operações de moderação e gerenciamento de conteúdo.


## Importante
- Para usar as funções SetTitleLive ou SetTegLive, é necessário obter o token do próprio canal que deseja modificar. Isso ocorre porque a Twitch separa as funcionalidades entre aquelas que um token pode realizar e aquelas que só podem ser realizadas com o token do canal específico. Por exemplo, se meu bot é chamado de StreamSquawk e desejo alterar o título ou a tag do canal chamado jvzx_, só conseguirei fazer isso com o token do próprio canal jvzx_, não com o token do StreamSquawk.

- Caso queira obter o token do CANAL para utilizar as duas funções, utilize o seguinte escopo:

```
scope=channel:manage:broadcast
```
- Para exemplificar, se eu utilizar as duas funções para tentar alterar o título ou a tag da transmissão ao vivo, utilizando o token do meu bot StreamSquawk, o título ou a tag serão alterados no CANAL do meu bot.

## Observation
-The complete documentation in English is available in the docs/english folder.