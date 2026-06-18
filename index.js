import { Telegraf, Context } from 'telegraf';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import handlers
import { setupCommandHandler } from './src/handlers/commandHandler.js';
import { setupEventHandler } from './src/handlers/eventHandler.js';
import { setupCallbackHandler } from './src/handlers/callbackHandler.js';
import { initializeDatabase } from './src/database/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate environment variables
const requiredEnvVars = ['BOT_TOKEN'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please copy .env.example to .env and fill in the required values');
  process.exit(1);
}

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Global error handler
bot.catch((err, ctx) => {
  console.error(`❌ Error for ${ctx.updateType}`, err);
  ctx.reply('❌ An error occurred. Please try again later.').catch(() => {});
});

// Middleware: Log updates
bot.use((ctx, next) => {
  console.log(`📨 ${ctx.updateType} from ${ctx.from?.username || ctx.from?.id || 'Unknown'}`);
  return next();
});

// Middleware: Check if user is blocked
bot.use(async (ctx, next) => {
  const db = await initializeDatabase();
  const blacklist = db.get('blacklist') || [];
  
  if (blacklist.includes(ctx.from?.id)) {
    console.log(`🚫 Blocked user: ${ctx.from?.id}`);
    return;
  }
  
  return next();
});

// Welcome message on /start
bot.start(async (ctx) => {
  const user = ctx.from;
  const username = user.username || 'User';
  
  const welcomeMessage = `
🤖 *Welcome to EVIL TILA TECH Bot!* 🤖

👋 Hello ${username}!
👤 Your ID: \`${user.id}\`
🔗 Your Username: @${user.username || 'N/A'}

━━━━━━━━━━━━━━━━━━━━
✨ *Features:*
• 🤖 AI ChatGPT Integration
• 🛡️ Group Management & Moderation
• 🎮 Fun Commands & Games
• 📊 User Statistics & Economy
• 🎨 Image & Sticker Tools

━━━━━━━━━━━━━━━━━━━━
📋 Use /help to see all available commands
💬 Use /ai to chat with AI
🔧 Use /setup to configure group settings

💡 Add me to your group and make me admin!
  `;

  try {
    // Try to send with profile picture
    if (user.photo) {
      await ctx.sendPhoto(
        (await ctx.telegram.getUserProfilePhotos(user.id, 0, 1)).photos[0][0].file_id,
        {
          caption: welcomeMessage,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '📚 Help', callback_data: 'help' },
                { text: '⚙️ Setup', callback_data: 'setup' }
              ],
              [
                { text: '🤖 Chat AI', callback_data: 'ai' },
                { text: '📞 Support', url: process.env.SUPPORT_GROUP || 'https://t.me/simonwolftech' }
              ]
            ]
          }
        }
      );
    } else {
      await ctx.reply(welcomeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📚 Help', callback_data: 'help' },
              { text: '⚙️ Setup', callback_data: 'setup' }
            ],
            [
              { text: '🤖 Chat AI', callback_data: 'ai' },
              { text: '📞 Support', url: process.env.SUPPORT_GROUP || 'https://t.me/simonwolftech' }
            ]
          ]
        }
      });
    }
  } catch (error) {
    console.error('Error in /start:', error);
    await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
  }
});

// Help command
bot.command('help', async (ctx) => {
  const helpMessage = `
📚 *EVIL TILA TECH Bot - Command List*

━━━━━━━━━━━━━━━━━━━━
🤖 *AI Commands:*
/ai <question> - Chat with ChatGPT
/gpt <prompt> - GPT-4 response
/imagine <prompt> - Generate images
/translate <text> - Translate text

━━━━━━━━━━━━━━━━━━━━
🛡️ *Group Management:*
/gatelock <on/off> - Enable CAPTCHA gate
/gatetype <type> - Set verification (button/redirect/dmrequest)
/rules - Show group rules
/setrules <text> - Set group rules
/warn <user> - Warn a user
/ban <user> - Ban a user
/mute <user> <time> - Mute a user
/antispam <on/off> - Toggle anti-spam
/antilinkoff - Disable link filter
/antilinkdeleteon - Delete links

━━━━━━━━━━━━━━━━━━━━
🎮 *Fun Commands:*
/dice - Roll a dice
/coin - Flip a coin
/choose <option1|option2> - Choose randomly
/joke - Get a random joke
/meme - Get a random meme

━━━━━━━━━━━━━━━━━━━━
⚙️ *Settings:*
/setup - Configure bot settings
/settings - Show current settings
/status - Check bot status
/ping - Check bot latency

━━━━━━━━━━━━━━━━━━━━
📊 *Info Commands:*
/myid - Get your user ID
/info <user> - Get user information
/stats - Show bot statistics

━━━━━━━━━━━━━━━━━━━━
💡 Tips:
• Add me to your group and make me admin
• Use /setup in group for management tools
• Need help? Join: ${process.env.SUPPORT_GROUP || 'https://t.me/simonwolftech'}
  `;

  await ctx.reply(helpMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 Back to Home', callback_data: 'home' }]
      ]
    }
  });
});

// Initialize handlers
setupCommandHandler(bot);
setupEventHandler(bot);
setupCallbackHandler(bot);

// Start bot
const startBot = async () => {
  try {
    console.log('🚀 Starting EVIL TILA TECH Bot...');
    
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database initialized');
    
    // Get bot info
    const botInfo = await bot.telegram.getMe();
    console.log(`✅ Bot connected: @${botInfo.username}`);
    console.log(`🤖 Bot ID: ${botInfo.id}`);
    console.log(`📝 Bot name: ${botInfo.first_name}`);
    
    // Start polling
    await bot.launch();
    console.log('✅ Bot is running!');
    
    // Graceful shutdown
    process.once('SIGINT', () => {
      console.log('\n👋 Shutting down gracefully...');
      bot.stop('SIGINT');
      process.exit(0);
    });
    
    process.once('SIGTERM', () => {
      console.log('\n👋 Shutting down gracefully...');
      bot.stop('SIGTERM');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
};

startBot();

export default bot;