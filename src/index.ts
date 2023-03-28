import { Client, Message } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import axios from "axios"



const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-extensions'
    ]
  }
});

client.on('qr', (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready');
});

client.on('message', async (message: Message) => {
  console.log(`Received message: ${message.body}`);
  const data = {
    'prompt': message.body,
    'max_tokens': 5
  };
  client.sendMessage(message.from, `we'll be right back`);
});

client.initialize().catch((error) => {
  console.log('Error while starting client:', error);
});
