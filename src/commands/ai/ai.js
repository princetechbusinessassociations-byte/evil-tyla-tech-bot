import { getDatabase } from '../../database/db.js';

export const command = 'ai';
export const description = 'Chat with ChatGPT AI';

export default async (ctx) => {
  try {
    const args = ctx.message.text.split(' ').slice(1).join(' ');
    
    if (!args) {
      await ctx.reply(
        '🤖 *Usage:* /ai <your question>\n\nExample: /ai What is AI?',
        { parse_mode: 'Markdown' }
      );
      return;
    }
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      await ctx.reply(
        '⚠️ AI feature is not configured yet.\n\nContact the bot developer to enable this feature.'
      );
      return;
    }
    
    // Show thinking message
    const thinkingMsg = await ctx.reply('🤔 Thinking...');
    
    try {
      // For now, simulate a response
      // In production, you would call OpenAI API here
      const mockResponse = `This is a mock AI response to: "${args}"\n\nTo enable real AI, configure OPENAI_API_KEY in .env`;
      
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        thinkingMsg.message_id,
        undefined,
        `🤖 *AI Response*\n\n${mockResponse}`,
        { parse_mode: 'Markdown' }
      );
      
    } catch (apiError) {
      console.error('API Error:', apiError);
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        thinkingMsg.message_id,
        undefined,
        '❌ Error getting AI response. Please try again.'
      );
    }
    
  } catch (error) {
    console.error('Error in AI command:', error);
    await ctx.reply('❌ Error executing command').catch(() => {});
  }
};