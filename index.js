import pkg from 'whatsapp-web.js';
import  qrcode from 'qrcode-terminal';
import  {GoogleGenerativeAI } from '@google/generative-ai'

import dotenv from 'dotenv';
dotenv.config();
const { Client, LocalAuth } = pkg;

// Create a new client instance

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on( 'ready', () => { 
    console.log('Client is ready!');
    
});

client.on('message', async (message) => {
    if (message.body) { 
        const prompt = message.body;
        try { 
            const result = await model.generateContent(prompt);
            message.reply(result.response.text())
        } catch (err) {
            console.log(err);
        }
    }
});

// Start your client
client.initialize();
