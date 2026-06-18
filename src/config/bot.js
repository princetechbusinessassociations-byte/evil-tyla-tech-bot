export const botConfig = {
  // Bot Information
  name: 'EVIL TILA TECH',
  version: '2.0.0',
  description: 'Advanced Telegram Bot with AI & Group Management',
  
  // Features
  features: {
    ai: true,
    groupManagement: true,
    funCommands: true,
    economy: false,
    moderation: true,
  },
  
  // Moderation Settings
  moderation: {
    antiSpam: {
      enabled: true,
      threshold: 5, // messages
      timeWindow: 10, // seconds
    },
    antiLink: {
      enabled: true,
      whitelistDomains: ['github.com', 'youtube.com'],
      action: 'delete', // delete, warn, kick
    },
    antiBadword: {
      enabled: true,
      action: 'delete',
    },
    antiNSFW: {
      enabled: true,
      action: 'delete',
    },
    floodGuard: {
      enabled: true,
      banDuration: 3600, // seconds
    },
  },
  
  // Group Settings
  groupSettings: {
    welcomeMessage: true,
    goodbyeMessage: true,
    captchaOnJoin: true,
    rules: true,
    notes: true,
    autoModeration: true,
  },
  
  // Command Prefix
  commandPrefix: ['/', '!', '.'],
  
  // Admin IDs
  ownerIds: [parseInt(process.env.OWNER_ID) || 0],
  
  // Database
  database: {
    type: process.env.USE_LOCAL_DB === 'true' ? 'local' : 'mongodb',
    local: {
      dataDir: './database',
    },
  },
  
  // Timeouts
  timeouts: {
    messageDelete: 5000, // ms
    warningExpire: 86400 * 30, // 30 days in seconds
    banExpire: 86400 * 7, // 7 days in seconds
  },
};

export default botConfig;