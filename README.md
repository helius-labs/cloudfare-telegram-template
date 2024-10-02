# Cloudflare Telegram Bot to listen to onchain events

This project is a template to get you started on setting up a Cloudflare Worker that listens to onchain events via Helius webhooks and sends notifications to a Telegram chat.

## Setup Instructions

1. Clone this repository:
   ```
   git clone git@github.com:helius-labs/cloudfare-telegram-template.git
   cd cloudfare-telegram-template
   ```

2. Install Wrangler CLI:
   ```
   npm install -g wrangler
   ```

3. Install project dependencies:
   ```
   npm install
   ```

4. Configure environment variables:
   Open `wrangler.toml` and fill in the following keys:
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token (get it from [@BotFather](https://t.me/botfather))
   - `TELEGRAM_CHAT_ID`: Your Telegram chat ID (use [@userinfobot](https://t.me/userinfobot) to get it)
   - `HELIUS_API_KEY`: Your Helius API key (get it from [Helius](https://www.helius.dev/))

   For detailed steps on creating a Telegram bot and getting the chat ID, refer to the [Telegram Bot API documentation](https://core.telegram.org/bots#6-botfather).

5. Deploy to Cloudflare:
   ```
   npm run deploy
   ```
   This will prompt you to log in to your Cloudflare account if you haven't already.

6. Create the webhook:
   After deployment, you'll get a URL for your worker. Use this URL to create the webhook by sending a POST request to the `/create-webhook` endpoint:
   ```
   curl -X POST https://your-worker-url.workers.dev/create-webhook
   ```
   Replace `your-worker-url` with your actual worker URL.

7. The webhook is now set up and targeting the `/webhook` endpoint of your worker.

That's it! Your bot should now be operational and will send messages.

## Customization

You can change the `create-webhook` endpoint in `src/index.ts` to create a new webhook.

You can modify the `/webhook` endpoint in `src/index.ts`  to change how messages are formatted or to listen for different types of events. 

## Troubleshooting

If you're not receiving messages, check the following:
- Ensure all environment variables in `wrangler.toml` are correctly set.
- Verify that your Telegram bot has permission to send messages to the specified chat.
- Check the Cloudflare Worker logs for any error messages.

For more help, refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) or the [Helius documentation](https://docs.helius.dev/).
# cloudfare-telegram-template
