const { Client, NoAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on( 'ready', () => { 
    console.log('Client is ready!');
    
});

client.on('message_create', async (message) => {
    if (message.body === '!Oi') {
        await message.reply('Olá, como posso te ajudar?');
    }
});

// Start your client
client.initialize();
