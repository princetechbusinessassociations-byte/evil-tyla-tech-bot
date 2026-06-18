export async function setupCallbackHandler(bot) {
  // Home callback
  bot.action('home', async (ctx) => {
    try {
      const user = ctx.from;
      const username = user.username || 'User';
      
      const homeMessage = `
🤖 *EVIL TILA TECH Bot* 🤖

👋 Welcome ${username}!
📱 Your ID: \`${user.id}\`

━━━━━━━━━━━━━━━━━━━━
✨ *Main Features:*
• 🤖 AI ChatGPT Integration
• 🛡️ Group Management & Moderation
• 🎮 Fun Commands & Games
• 📊 User Statistics

━━━━━━━━━━━━━━━━━━━━
      `;
      
      await ctx.editMessageText(homeMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📚 Help', callback_data: 'help' },
              { text: '⚙️ Setup', callback_data: 'setup' }
            ],
            [
              { text: '🤖 Chat AI', callback_data: 'ai' },
              { text: '📞 Support', url: 'https://t.me/simonwolftech' }
            ]
          ]
        }
      }).catch(() => ctx.answerCbQuery('Already on home', true));
    } catch (error) {
      console.error('Error in home callback:', error);
      await ctx.answerCbQuery('Error occurred', true);
    }
  });
  
  // Help callback
  bot.action('help', async (ctx) => {
    try {
      const helpMessage = `
📚 *Command Categories:*

🤖 /ai <question> - Chat with AI
🛡️ /setup - Configure group settings
🎮 /fun - Fun commands
⚙️ /settings - Bot settings
📊 /stats - Statistics

Use /help in chat for full command list.
      `;
      
      await ctx.editMessageText(helpMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏠 Back', callback_data: 'home' }]
          ]
        }
      }).catch(() => ctx.answerCbQuery('Already on help', true));
    } catch (error) {
      console.error('Error in help callback:', error);
      await ctx.answerCbQuery('Error occurred', true);
    }
  });
  
  // Setup callback
  bot.action('setup', async (ctx) => {
    try {
      const chatId = ctx.chat?.id;
      
      if (!chatId) {
        await ctx.answerCbQuery('Setup is only available in groups', true);
        return;
      }
      
      const setupMessage = `
⚙️ *Group Configuration Setup*

Choose what you want to configure:
      `;
      
      await ctx.editMessageText(setupMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🛡️ Moderation', callback_data: 'setup_moderation' }],
            [{ text: '👋 Welcome', callback_data: 'setup_welcome' }],
            [{ text: '📋 Rules', callback_data: 'setup_rules' }],
            [{ text: '🏠 Back', callback_data: 'home' }]
          ]
        }
      }).catch(() => ctx.answerCbQuery('Already on setup', true));
    } catch (error) {
      console.error('Error in setup callback:', error);
      await ctx.answerCbQuery('Error occurred', true);
    }
  });
  
  // AI callback
  bot.action('ai', async (ctx) => {
    try {
      const aiMessage = `
🤖 *Chat with AI*

Ask me anything! I can help with:
• Questions & answers
• Writing & editing
• Coding & technical help
• General conversation

Use /ai <your question>

Example: /ai What is machine learning?
      `;
      
      await ctx.editMessageText(aiMessage, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏠 Back', callback_data: 'home' }]
          ]
        }
      }).catch(() => ctx.answerCbQuery('Already on AI', true));
    } catch (error) {
      console.error('Error in AI callback:', error);
      await ctx.answerCbQuery('Error occurred', true);
    }
  });
  
  console.log('✅ Callback handlers setup complete');
}

export default { setupCallbackHandler };