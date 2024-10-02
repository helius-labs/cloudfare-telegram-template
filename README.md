# Cloudflare Telegram Bot to listen to onchain events

This project is a template to get you started on setting up a Cloudflare Worker that listens to onchain events via Helius webhooks and sends notifications to a Telegram chat.

## Setup Instructions

1. Clone this repository:
   ```
   git clone git@github.com:helius-labs/cloudfare-telegram-template.git
   cd cloudfare-telegram-template
   ```

2. Install project dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Open `wrangler.toml` and fill in the following keys:
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token (get it from [@BotFather](https://t.me/botfather))
   - `TELEGRAM_CHAT_ID`: Your Telegram channel's chat ID (see below)
   - `HELIUS_API_KEY`: Your Helius API key (get it from [Helius](https://www.helius.dev/))

   To get your Telegram channel's chat ID:
   1. Create a channel and add your bot as an administrator.
   2. Send a message to the channel.
   3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   4. Find the `"chat":{"id":` field in the response. This is your chat ID.

4. Deploy to Cloudflare:
   ```
   npm run deploy
   ```

5. Create the webhook:
   ```
   curl -X POST https://your-worker-url.workers.dev/create-webhook
   ```
   Replace `your-worker-url` with your actual worker URL.

That's it! Your bot should now be operational and will send messages to your Telegram channel.

## Customization

Modify `src/index.ts` to change webhook creation or message formatting.

## Troubleshooting

- Check environment variables in `wrangler.toml`.
- Ensure bot has permission to send messages to the channel.
- Review Cloudflare Worker logs for errors.

For more help, see [Cloudflare Workers docs](https://developers.cloudflare.com/workers/) or [Helius docs](https://docs.helius.dev/).