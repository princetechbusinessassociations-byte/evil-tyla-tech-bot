import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandCategories = [
  'system',
  'ai',
  'group',
  'owner',
  'fun',
  'utility',
];

export async function setupCommandHandler(bot) {
  const commands = new Map();
  
  try {
    // Load commands from each category
    for (const category of commandCategories) {
      const categoryPath = join(__dirname, '../commands', category);
      
      try {
        const files = readdirSync(categoryPath);
        
        for (const file of files) {
          if (!file.endsWith('.js')) continue;
          
          const commandPath = join(categoryPath, file);
          const { default: commandHandler, command, description } = await import(`file://${commandPath}`);
          
          if (command && commandHandler) {
            commands.set(command, {
              handler: commandHandler,
              description: description || 'No description',
              category,
            });
            
            console.log(`✅ Loaded command: /${command} (${category})`);
          }
        }
      } catch (error) {
        // Category folder might not exist yet, that's okay
        console.log(`⚠️  Category folder not found: ${category}`);
      }
    }
    
    // Register all commands
    for (const [cmdName, { handler }] of commands) {
      bot.command(cmdName, handler);
    }
    
    // Store commands map in context
    bot.context.commands = commands;
    
    console.log(`✅ Command handler setup complete. Loaded ${commands.size} commands.`);
    
  } catch (error) {
    console.error('❌ Error setting up command handler:', error);
  }
}

export default { setupCommandHandler };