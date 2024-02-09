# TwitchToolsVX - Novas Implementações

Este projeto é uma biblioteca/módulo que proporciona funcionalidades adicionais para interações com a API da Twitch, complementando a biblioteca Vitor-VX/Twitch-Tools e muito mais.

## Funcionalidades

### `SetTitleLive(authTokenMain, channel, title, botChannel = false)`
Define o título de uma transmissão ao vivo.

**Exemplo de Uso:**
```javascript
SetTitleLive('authToken', 'channelName', 'Novo Título da Live');
```

### `SetTegLive(authTokenMain, channel, teg, botChannel = false)`
Define a tag de uma transmissão ao vivo.

**Exemplo de Uso:**
```javascript
SetTegLive('authToken', 'channelName', 'nova-tag');
```

### `GetTokenTwitchDevice(waitTimeInSeconds, scopes = [])`
Obtém um token de autenticação usando o fluxo de dispositivo OAuth da Twitch.

**Exemplo de Uso:**
```javascript
GetTokenTwitchDevice(30, ['channel:manage:broadcast']);
```

### `RefreshToken(refreshToken, clientSecret)`
Atualiza um token de autenticação usando um token de atualização.

**Exemplo de Uso:**
```javascript
RefreshToken('refreshToken', 'clientSecret');
```

### Funcionalidades Adicionais

Além das funcionalidades mencionadas acima, esta biblioteca também inclui recursos personalizados que eu mesmo desenvolvi e que podem ser úteis, tais como:

- `RemoveSpamCaules(channel, botModerator, message, tags)`: Remove mensagens que contenham caules de spam.
- `BanSpamCaules(channel, botModerator, userBanned, message)`: Bane usuários que enviaram mensagens contendo caules de spam.
- `RemoveMessageSwearWord(channel, botModerator, tags, message)`: Remove mensagens que contenham palavras consideradas palavrões.
- `BanSwearWord(channel, botModerator, userBanned, message)`: Bane usuários que enviaram mensagens contendo palavras consideradas palavrões.

Estas funcionalidades adicionais foram desenvolvidas por mim mesmo, utilizando bibliotecas próprias como a `npm i swearguard-vx`, que verifica palavrões nas strings, e não "fazem parte" das funcionalidades padrão da Twitch.

Essas funcionalidades são úteis para moderar e gerenciar transmissões ao vivo na plataforma Twitch. A classe TwitchToolsVX fornece uma interface conveniente para interagir com a API da Twitch e realizar várias operações de moderação e gerenciamento de conteúdo.

## Instalação

Para instalar a biblioteca, você pode usar o npm. Execute o seguinte comando:

```bash
npm i twitch-tools-vx
```

## Importante

Para usar as funções SetTitleLive ou SetTegLive, é necessário obter o token do próprio canal que deseja modificar. Isso ocorre porque a Twitch separa as funcionalidades entre aquelas que um token pode realizar e aquelas que só podem ser realizadas com o token do canal específico. Por exemplo, se meu bot é chamado de StreamSquawk e desejo alterar o título ou a tag do canal chamado jvzx_, só conseguirei fazer isso com o token do próprio canal jvzx_, não com o token do StreamSquawk.

Caso queira obter o token do CANAL para utilizar as duas funções, utilize o seguinte escopo:

```
scope=channel:manage:broadcast
```

Para exemplificar, se eu utilizar as duas funções para tentar alterar o título ou a tag da transmissão ao vivo, utilizando o token do meu bot StreamSquawk, o título ou a tag serão alterados no CANAL do meu bot.
