const TwitchToolsVX = require("TwitchToolsVX");
const TwitchEx = new TwitchToolsVX("__TOKEN__", "client-id");

const tmi = require('tmi.js');
const TwitchClient = tmi.Client({
    options: { debug: false },
    identity: {
        username: 'StreamSquawk',
        password: "__TOKEN__"
    },
    channels: ["streamsquawk"]
});

TwitchClient.connect();

TwitchClient.on('message', async (canal, tags, message, self) => {
    const user = tags.username, mensagemChat = message.toLowerCase();
    canal = canal.replace('#', '');

    const scopes = [
        'chat:read',
        'chat:edit',
        'channel:moderate',
        'whispers:read',
        'whispers:edit',
        'channel_editor',
        'moderator:manage:banned_users',
        'moderation:read',
        'moderator:manage:banned_users',
        'moderator:manage:chat_messages',
        'moderator:read:chatters',
        'moderator:manage:blocked_terms',
        'moderator:manage:chat_settings',
        'user:manage:whispers',
        'channel:manage:broadcast',
        'user:read:email'
    ];

    // Exemplo 1: Definir o título de uma transmissão ao vivo
    const titulo = "Novo título da transmissão";
    const respostaTitulo = await TwitchEx.SetTitleLive("SeuAuthToken", "NomeDoCanal", titulo);
    console.log(respostaTitulo);

    // Exemplo 2: Definir a tag de uma transmissão ao vivo
    const tag = "NovaTag";
    const respostaTag = await TwitchEx.SetTegLive("SeuAuthToken", "NomeDoCanal", tag);
    console.log(respostaTag);

    // Exemplo 3: Obter um token de autenticação usando o fluxo de dispositivo OAuth da Twitch
    const tempoDeEspera = 60000; // Tempo em segundos para esperar -> 1 minuto
    const token = await TwitchEx.GetTokenTwitchDevice(tempoDeEspera, scopes);
    console.log(token);

    // Exemplo 4: Atualizar um token de autenticação usando um token de atualização
    const refreshToken = "SeuRefreshToken";
    const clientSecret = "SeuClientSecret";
    const respostaRefreshToken = await TwitchEx.RefreshToken(refreshToken, clientSecret);
    console.log(respostaRefreshToken);

    // Exemplo 5: Remover mensagens que contenham palavras consideradas palavrões
    const respostaRemoverPalavrao = await TwitchEx.RemoveMessageSwearWord(canal, "NomeDoBotModerador", tags, mensagemChat);
    console.log(respostaRemoverPalavrao);

    // Exemplo 6: Banir usuários que enviaram mensagens contendo palavrões
    const respostaBanirPalavrao = await TwitchEx.BanSwearWord(canal, "NomeDoBotModerador", user, mensagemChat);
    console.log(respostaBanirPalavrao);
});
