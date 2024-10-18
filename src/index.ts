import { Hono } from 'hono';

type Env = {
  HELIUS_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  AUTH_TOKEN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.text('Solana Action Bot is running!'));

app.post('/create-webhook', async (c) => {
  const webhookURL = `${new URL(c.req.url).origin}/webhook`;  
  console.log('Setting up webhook with URL:', webhookURL);

  const response = await fetch(
    `https://api.helius.xyz/v0/webhooks?api-key=${c.env.HELIUS_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhookURL: webhookURL,
        transactionTypes: ["NFT_SALE"],
        accountAddresses: ["M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"], // Magic Eden v2 program
        webhookType: "enhanced",
        authHeader: c.env.AUTH_TOKEN
      }),
    }
  );
  const data = await response.json();
  console.log('Helius webhook setup response:', data);
  return c.json({ success: true, webhook: data, webhookURL: webhookURL });
});

async function sendTelegramMessage(message: string, env: Env) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
  return response.json();
}

app.post('/webhook', async (c) => {

  let data;
  try {
    data = await c.req.json();
    console.log('Received webhook data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error parsing webhook data:', error);
    return c.text('Error processing webhook', 400);
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.log('No transactions in webhook data');
    return c.text('No transactions to process', 200);
  }

  for (const transaction of data) {
    if (transaction.type === 'NFT_SALE') {
      const { amount, buyer, seller, signature, nfts } = transaction.events.nft;
      const message = `🎉 *NFT Sale*\n\n` +
        `*Price*: ${amount / 1e9} SOL\n` +
        `*Buyer*: \`${buyer}\`\n` +
        `*Seller*: \`${seller}\`\n` +
        `*Signature*: [View on Solana Explorer](https://explorer.solana.com/tx/${signature})`;
      
      try {
        const result = await sendTelegramMessage(message, c.env);
        console.log('Telegram message sent:', result);
      } catch (error) {
        console.error('Error sending Telegram message:', error);
      }
    }
  }

  return c.text('Webhook processed');
});

export default app;
