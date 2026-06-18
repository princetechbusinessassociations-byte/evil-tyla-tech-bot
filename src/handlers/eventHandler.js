export async function setupEventHandler(bot) {
  // Handle new members joining
  bot.on('new_chat_members', async (ctx) => {
    try {
      const newMembers = ctx.message.new_chat_members;
      const group = ctx.chat;
      
      for (const member of newMembers) {
        if (member.is_bot) {
          // If the bot itself joined
          if (member.id === ctx.botInfo.id) {
            await ctx.reply(
              `🤖 Thanks for adding me to *${group.title}*!\n\nUse /setup to configure my features.`,
              { parse_mode: 'Markdown' }
            );
          }
        } else {
          // Regular member joined
          const welcomeMsg = `
👋 Welcome ${member.first_name}!
🆔 ID: \`${member.id}\`
📸 ${member.username ? `@${member.username}` : 'No username'}

Type /rules to see group rules.
          `;
          
          await ctx.reply(welcomeMsg, { parse_mode: 'Markdown' });
        }
      }
    } catch (error) {
      console.error('Error in new_chat_members handler:', error);
    }
  });
  
  // Handle member leaving
  bot.on('left_chat_member', async (ctx) => {
    try {
      const leftMember = ctx.message.left_chat_member;
      
      if (leftMember.id !== ctx.botInfo.id) {
        await ctx.reply(
          `👋 ${leftMember.first_name} left the group. Goodbye!`
        );
      }
    } catch (error) {
      console.error('Error in left_chat_member handler:', error);
    }
  });
  
  // Handle text messages (for filters/auto-responses)
  bot.on('text', async (ctx, next) => {
    try {
      // This will be used for filters and auto-responses
      // For now, just pass to next handler
      return next();
    } catch (error) {
      console.error('Error in text handler:', error);
    }
  });
  
  // Handle photo uploads
  bot.on('photo', async (ctx, next) => {
    try {
      return next();
    } catch (error) {
      console.error('Error in photo handler:', error);
    }
  });
  
  // Handle document uploads
  bot.on('document', async (ctx, next) => {
    try {
      return next();
    } catch (error) {
      console.error('Error in document handler:', error);
    }
  });
  
  console.log('✅ Event handlers setup complete');
}

export default { setupEventHandler };