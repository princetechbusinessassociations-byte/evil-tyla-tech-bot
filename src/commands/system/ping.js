export const command = 'ping';
export const description = 'Check bot latency';

export default async (ctx) => {
  try {
    const startTime = Date.now();
    const msg = await ctx.reply('🏓 Pong!');
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      msg.message_id,
      undefined,
      `🏓 *Pong!*\n⏱️ Latency: ${latency}ms`,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error('Error in ping command:', error);
    await ctx.reply('❌ Error executing command').catch(() => {});
  }
};